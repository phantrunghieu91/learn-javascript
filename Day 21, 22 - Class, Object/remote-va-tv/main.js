class Channel {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }

    setId(id){
        this.id = id;
    }
    setName(name){
        this.name = name;
    }
};

class Tv {
    MAX_VOLUME = 100;
    MIN_VOLUME = 0;
    constructor(currentChannel, currentVolume = this.MIN_VOLUME, status = false) {
        this.currentChannel = currentChannel;
        this.currentVolume = currentVolume;
        this.status = status;
    }
    getCurrentChannel(){
        return this.currentChannel;
    }
    getCurrentVolume(){
        return this.currentVolume;
    }
    getStatus(){
        return this.status;
    }
    setCurrentChannel(channel){
        this.currentChannel = channel;
    }
    setCurrentVolume(num) {
        this.currentVolume = num;
    }
    setStatus(status){
        this.status = status;
    }
};

class Remote {
    constructor(id) {
        this.id = id;
    }

    getId(){
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    switchOnOff = (tv) => {
        tv.setStatus(!tv.getStatus());
    }

    volumeControls(control, tv){
        if(tv.status == true){
            switch(control){
                case "up":
                    this.volumeUp(tv);
                    break;
                case "down":
                    this.volumeDown(tv);
                    break;
            }
        } else {
            console.log("Chưa bật tivi!");
        }
    }

    volumeUp = (tv) => {
        let currentVolume = tv.getCurrentVolume();
        if(currentVolume < tv.MAX_VOLUME) {
            tv.setCurrentVolume(currentVolume += 1);
        }
    };

    volumeDown = (tv) => {
        let currentVolume = tv.getCurrentVolume();
        if(currentVolume > tv.MIN_VOLUME){
            tv.setCurrentVolume(currentVolume -= 1);
        }
    };

    channelSwitch = (control, tv, channels) => {
        if(tv.status == true){
            switch(control){
                case "up":
                    this.channelUp(tv, channels);
                    break;
                case "down":
                    this.channelDown(tv, channels);
                    break;
            }
        } else {
            console.log("Chưa bật tivi!");
        }
    };

    channelUp = (tv, channels) => {
        let currentChannel = tv.getCurrentChannel();
        let currentChannelIndex = channels.findIndex(el => el == currentChannel);
        if(currentChannelIndex == channels.length - 1) {
            tv.setCurrentChannel(channels[0]);
        } else {
            tv.setCurrentChannel(channels[currentChannelIndex + 1]);
        }
    };

    channelDown = (tv, channels) => {
        let currentChannel = tv.getCurrentChannel();
        let currentChannelIndex = channels.findIndex(el => el == currentChannel);
        if(currentChannelIndex == 0) {
            tv.setCurrentChannel(channels[channels.length - 1]);
        } else {
            tv.setCurrentChannel(channels[currentChannelIndex - 1]);
        }
    };
};

let discovery = new Channel(1, "Discovery");
let nationalGraphic = new Channel(2, "National Graphic");
let mtv = new Channel(3, "MTV");
let disney = new Channel(4, "Disney Channel");
let cartoonNetwork = new Channel(5, "Cartoon Network");
let foxMovie = new Channel(6, "Fox Movie");
let classicHollywood = new Channel(7, "Classic Hollywood");
let channels = [discovery, nationalGraphic, mtv, cartoonNetwork, disney, foxMovie, classicHollywood];
// Main
let samsung = new Tv(classicHollywood);
let ssRemote = new Remote(0);
ssRemote.switchOnOff(samsung);
console.log(samsung.getStatus());
console.log(samsung.getCurrentChannel());
while(samsung.getCurrentChannel().getId() != 3){
    ssRemote.channelSwitch("down", samsung, channels);
}
console.log(samsung.getCurrentChannel());
console.log(samsung.getCurrentVolume());
for(let i = 0; i < 2; i++) {
    ssRemote.volumeControls("up", samsung);
}
console.log(samsung.getCurrentVolume());
ssRemote.switchOnOff(samsung);
console.log(samsung.getStatus());