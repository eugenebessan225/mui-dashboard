#!/usr/bin/env python
#  -*- coding: utf-8 -*-

from __future__ import print_function
from threading import Timer

import psycopg2
from pgcopy import CopyManager

from sys import stdout
from time import sleep
from math import sqrt
from daqhats import mcc172, OptionFlags, SourceType, HatIDs, HatError
# import sys
# sys.path.insert(0, )
from daqhats_utils import select_hat_device, enum_mask_to_string, chan_list_to_mask
from datetime import datetime, timedelta

import os
import csv  # this is the import to make csv file creation simple.
import errno

import time
import pika


READ_ALL_AVAILABLE = -1

CURSOR_BACK_2 = '\x1b[2D'
ERASE_TO_END_OF_LINE = '\x1b[0K'



def get_iepe():

    while True:
        # Wait for the user to enter a response
        message = "IEPE enable [y or n]? \n "
        response = input(message)

        # Check for valid response
        if (response == "y") or (response == "Y"):
            return 1
        elif (response == "n") or (response == "N"):
            return 0
        else:
            # Ask again.
            print("Invalid response.")


def get_channel():
    """
    Get channels to be used from the user.
    """
    while True:
        # Wait for the user to enter a response
        message = "Which channel(s) to use ? Type 0 for Channel 0, type 1 for Channel 1, type 2 for both : \n "
        response = input(message)
        # Check for valid response
        if response == "0":
            return [0]
        elif response == "1":
            return [1]
        elif response == "2":
            return [0, 1]
        else:
            # Ask again
            print("Invalid response.")


def get_calibration():
    """
    Get calibration rate from user depending on which accelerometer is used
    """

    calib_dict = {'237354': 90, '237206': 104, '237355': 90, '237207': 107}
    list_keys = list(calib_dict.keys())

    while True:
        # Wait for user answer
        message = "Which accelerometer ? \n \n Type 1 for 237354, type 2 for 237206, type 3 for 237355, type 4 for 237207 \n "
        response = input(message)

        # check for valid response
        if int(response) in [1, 2, 3, 4]:
            dict_index = list_keys[int(response)-1]  # -1 for list indexing
            sensitivity = calib_dict[dict_index]
            print("\r Selected sensitivity of channel is %d mV/g. Returned data will be in unit of g \n" % sensitivity)
            return sensitivity
        else:
            # Ask again
            print("Invalid response.")

    pass


def get_scan_rate():
    """
    Get scan rate from user (between 200 and 51200)
    closest to a 51.2KHz clock source divided by an integer between 1 and 256 
    """

    while True:
        # Wait for user answer
        message = "Specify scan rate (max = 51200) \n"
        response = input(message)

        # check for valid response
        if int(response) <= 51200:
            return int(response)
        else:
            # Ask again
            print("Invalid response.")
    pass


def calc_rms(data, channel, num_channels, num_samples_per_channel):
    """ Calculate RMS value from a block of samples. """
    value = 0.0
    index = channel
    for _i in range(num_samples_per_channel):
        value += (data[index] * data[index]) / num_samples_per_channel
        index += num_channels

    return sqrt(value)




def main():
    """
    This function is executed automatically when the module is run directly.
    """
    # Store the channels in a list and convert the list to a channel mask that
    # can be passed as a parameter to the MCC 172 functions.
    channels = [0, 1]  # 0
    channel_mask = chan_list_to_mask(channels)
    num_channels = len(channels)
    # Continuous :
    samples_per_channel = 10000
    options = OptionFlags.CONTINUOUS
    # Finite :
    # samples_per_channel = 1024
    # options = OptionFlags.DEFAULT
    scan_rate = 1024.0

    cannal.queue_declare(queue='row_data', durable=True)
    cannal.queue_declare(queue='rms_data', durable=True)

    try:
        # Select an MCC 172 HAT device to use.
        address = select_hat_device(HatIDs.MCC_172)
        hat = mcc172(address)


        # Turn IEPE supply ? Calib rate ?

        for channel in channels:
            # print(
            #     "\r Channel  %d configuration of IEPE and calibration rate \n" % channel)
            iepe_enable = 1
            hat.iepe_config_write(channel, iepe_enable)
            calib_rate = 107
            hat.a_in_sensitivity_write(channel, calib_rate)

        # Scan rate ?
        scan_rate = 1024
        hat.a_in_clock_config_write(SourceType.LOCAL, scan_rate)

        actual_scan_rate = hat.a_in_scan_actual_rate(scan_rate)

        # Wait for sync in case of external clock (Master hat or external)
        synced = False
        while not synced:
            (_source_type, actual_scan_rate, synced) = hat.a_in_clock_config_read()
            if not synced:
                sleep(0.005)

        hat.a_in_scan_start(channel_mask, samples_per_channel, options)
        time = datetime.now()
        freq = timedelta(seconds=1/actual_scan_rate)

        print('Starting scan ... Press Ctrl-C to stop\n')

        # Display the header row for the data table.
        print('Samples Read    Scan Count', end='')
        for chan, item in enumerate(channels):
            print('    Channel (RMS) ', item, sep='', end='')
        print('')

        try:
            read_and_to_csv_data(hat, num_channels, time, freq)

        except KeyboardInterrupt:
            # Clear the '^C' from the display.
            print(CURSOR_BACK_2, ERASE_TO_END_OF_LINE, '\n')
            hat.a_in_scan_stop()
            hat.a_in_scan_cleanup()

            # Turn off IEPE supply
            for channel in channels:
                hat.iepe_config_write(channel, 0)
            with open("test_array.txt", "w+") as file:
                file.write(str(tstrms))

    except (HatError, ValueError) as err:
        print('\n', err)


def read_and_to_csv_data(hat, num_channels, time, freq):

    total_samples_read = 0
    read_request_size = -1  # READ_ALL_AVAILABLE = -1

    # When doing a continuous scan, the timeout value will be ignored in the
    # call to a_in_scan_read because we will be requesting that all available
    # samples (up to the default buffer size) be returned.
    timeout = 5.0
    current_time = time


    while (True):
        read_result = hat.a_in_scan_read(read_request_size, timeout)

        # Check for an overrun error
        if read_result.hardware_overrun:
            print('\n\nHardware overrun\n')
            # logfile.write('\n\nHardware overrun\n')
            hat.a_in_scan_stop()
            hat.a_in_scan_cleanup()
            break
        elif read_result.buffer_overrun:
            print('\n\nBuffer overrun\n')
            # logfile.write('\n\nBuffer overrun\n')
            hat.a_in_scan_stop()
            hat.a_in_scan_cleanup()
            break

        samples_read_per_channel = int(
            len(read_result.data) / num_channels)
        # logfile.write("\r Samples read per channel %f \n" % samples_read_per_channel)
        samp_per_chan.append(samples_read_per_channel)
        total_samples_read += samples_read_per_channel
        # logfile.write("\r Total samples read  %f \n" % total_samples_read)
        tot_samp.append(total_samples_read)

        totalSamples = len(read_result.data)
        # print("\r MyTotalSamples = %d\n" % totalSamples)
        tot2.append(totalSamples)




        if samples_read_per_channel > 0:
        
            values_raw = []
            rms_tuples_array = []
            for i in range(0, totalSamples, num_channels):
                current_time += freq
                row = [current_time]+[round(data, 3)
                                      for data in read_result.data[i:i+num_channels]]           
                #print(row)
                values_raw.append(tuple(row))
                #row_data = {
                    #'y1' : row[1],
                    #'y2' : row[2]
		        #}
                #print(row)
                data = str(row)
                print(data)
                cannal.basic_publish(exchange='', routing_key='data', body=data)
            # mgr.copy(values)
            rms = [current_time] + [round((calc_rms(
                read_result.data, i, num_channels, samples_read_per_channel)), 3) for i in range(num_channels)]  # copying from line 416
            global tstrms
            tstrms.append(rms[0])
            rms_tuples_array.append(tuple(rms))
            
            

        sleep(0.1)  # wait for "enough" acquisition to take place

        # print('\n')

if __name__ == '__main__':
    samp_per_chan = []
    tot_samp = []
    tot2 = []
    timelist = []
    tstrms = []
    connection = pika.BlockingConnection(pika.URLParameters("amqps://atdchydl:KjmqrJCGK4-l8Pu5-3mb6TWy75tvROJO@fish.rmq.cloudamqp.com/atdchydl"))
    cannal = connection.channel()
    main()
