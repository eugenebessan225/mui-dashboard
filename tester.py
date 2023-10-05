"""@sio.on('data_request')
async def send_data(sid):
    print("In data request")
    
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
    
    try:
        # Select an MCC 172 HAT device to use.
        address = select_hat_device(HatIDs.MCC_172)
        hat = mcc172(address)

        # Turn IEPE supply ? Calib rate ?

        for channel in channels:
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
		
        # buffer size is desired, set the value of this parameter accordingly.
        hat.a_in_scan_start(channel_mask, samples_per_channel, options)
        time = datetime.now()
        freq = timedelta(seconds=1/actual_scan_rate)
	
        
        await read_data(hat, num_channels, time, freq)

    except (HatError, ValueError) as err:
        print('\n', err)
	

            
async def read_data(hat, num_channels, time, freq):
    
    print("ok")
    
    total_samples_read = 0
    read_request_size = -1  # READ_ALL_AVAILABLE = -1

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

                values_raw.append(tuple(row))
                row_data = {
		   'x': int(current_time.timestamp() * 1000),
		    'y1' : row[1],
		    'y2' : row[2]
		}
                await sio.emit('row_data', row_data)
                print(row_data)

                timelist.append(current_time.isoformat())
            rms = [current_time] + [round((calc_rms(
                read_result.data, i, num_channels, samples_read_per_channel)), 3) for i in range(num_channels)]  # copying from line 416
            global tstrms
            tstrms.append(rms[0])
            rms_tuples_array.append(tuple(rms))
            rms_data = {
		   'x': int(current_time.timestamp() * 1000),
		    'y1' : row[1],
		    'y2' : row[2]
		}
            #await sio.emit('rms_data', rms_data)

        sleep(0.1)  # wait for "enough" acquisition to take place"""