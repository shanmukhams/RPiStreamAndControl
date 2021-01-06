# RPiStreamAndControl
Two methods:

1. WebRTC and UV4L
2. Web Sockets: sending images every second

Steps:
1. git clone https://github.com/shanmukhams/RPiStreamAndControl.git

2. to run client:
    cd client
    npm i
    npm start
    http://<ip>:3000
    
2. to run server:
    a. cd server
    b. npm i
    c. Installing UV4L and WebRTC support (credits: reef nerd: https://www.youtube.com/watch?v=5QAHlZoPlgI&feature=emb_title)
        i.    SSH into your Raspberry Pi
                o curl http://www.linux-projects.org/listing/uv4l_repo/lpkey.asc | sudo apt-key add –
                o cd
                o sudo nano /etc/apt/sources.list
                o Paste the following line into the file we just opened
                o deb http://www.linux-projects.org/listing/uv4l_repo/raspbian/stretch stretch main
                o Save by pressing Ctrl + O then enter and exit with Ctrl + X
        ii.   Now we are ready to update the system and fetch and install the packages
                o sudo apt-get update
                o sudo apt-get install uv4l uv4l-raspicam
                o sudo apt-get install uv4l-raspicam-extras uv4l-server uv4l-mjpegstream uv4l-demos uv4l-xmpp-bridge
        iii.  We will be using WebRTC to stream the Camera
                o If using a Raspberry Pi 2 or 3 type
                o sudo apt-get install uv4l-webrtc
                o If using an Raspberry Pi 1 or Zero
                o sudo apt-get install uv4l-webrtc-armv6
        iv.   At any time you can restart the UV4L service by typing
                o sudo service uv4l_raspicam restart
        v.    Test the camera and UV4L WebRTC Server
                o So we now want to test that the UV4L service is running and the camera is working. On your web-browser on your computer to http://<rpi>:8080/
                o You should see the UV4L streaming server interface load up
                o Click on the MJPEG/Stills stream option and a high res still from the camera should load, don’t be alarmed if its slow to load, this is not the video stream we will be using; just a basic test for camera quality and function
        vi.   Configuring the UV4L server and website
                o Open a new SSH session with the Raspberry Pi or use the old one if its still open
                o We are going to edit the default configuration file of the UV4L server. After making changes, ctrl-o and enter to save, then ctrl-x and enter to exit. Then restart the UV4L server using the command we noted down.
                  • cd
                  • sudo nano /etc/uv4l/uv4l-raspicam.conf
                  • Using the arrow keys to navigate the file we will be un-commenting some lines by deleting the # in front of them, and modifying the values
                  • If you image is upside down or you want the camera orientation to change the values of these two settings to yes or no accordingly
                    o Hflip = no
                    o Vflip = no
                  • Find the sections below (some are right near the bottom of the file) and make these changes and uncomment by removing the #
                    ### WebRTC options:
                    server-option = --enable-webrtc=yes
                    server-option = --enable-webrtc-datachannels=yes
                    server-option = --webrtc-datachannel-label=uv4l
                    server-option = --webrtc-datachannel-socket=/tmp/uv4l.socket
                    server-option = --enable-webrtc-video=yes
                    server-option = --enable-webrtc-audio=no
                    …
                    server-option = --webrtc-max-playout-delay=34
                    …
                    ### These options are specific to the HTTP/HTTPS Server
                    ### serving custom Web pages only:
                    server-option = --enable-www-server=yes
                    server-option = --www-root-path=/usr/share/uv4l/demos/reefcam/
                    server-option = --www-index-file=index.html
                    server-option = --www-port=8888
                    …
                    server-option = --www-max-queued-connections=8
                    server-option = --www-max-threads=4
                    server-option = --www-thread-idle-time=10
                    …
                    server-option = --www-webrtc-signaling-path=/webrtc
                  • Save and exit the config file once you have made those changes (ctrl – o and ctrl – x) and then restart the UV4L service.
                    o sudo service uv4l_raspicam restart
                  • Go to this path
                    o cd
                    o cd /usr/share/uv4l/demos
                    o sudo mkdir reefcam
                    o cd reefcam
                    o sudo wget https://github.com/MulletBoy/Raspberry-Pi-FishCam-DemoSite/archive/master.zip
                    o sudo unzip -j master.zip
                    
        In your web-browser now to 192.168.1.7:8888 with your IP Raspberry Pi’s address and noting the 8888 port location instead of the 8080 we went to before
          • You should see the ReefCam website.
          • Test it by starting the steaming.
          • Then click stop streaming.
     
     d. node server
     
        
   
