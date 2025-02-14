    class Peer{
        constructor() {
            if(!this.peer)
            {
                this.peer=new RTCPeerConnection({
                    iceServers:[
                        { urls: ['stun:stun.l.google.com:19302'],}
                    ]
                })
            }
            }
    }

    async function getOffer(){
        if(this.peer){
            const offer=await this.peer.createOffer()
            await this.peer.setLocalDescription(new RTCSessionDescription(offer))
            return offer
        }
    }

    async function getAnswer(offer) {
            if(this.peer){
                //recieving the offer and seeting it in remote description
                await this.peer.setRemoteDescription(new RTCSessionDescription(offer))
                const answer=await this.peer.createAnswer()
                await this.peer.setLocalDescription(new RTCSessionDescription(answer))
                return answer
            }
    }

    async function handleAnswer(answer) {
            if(this.peer){
                await this.peer.setRemoteDescription(new RTCSessionDescription(answer))
            }
    }
    export default new Peer()
