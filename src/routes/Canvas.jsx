import React from 'react';
import { connect } from 'dva';

class Canvas extends React.Component {

    componentDidMount() {
        this.canvas.height = document.body.scrollHeight;
        this.canvas.width = document.body.scrollWidth;

        this.cxt = this.canvas.getContext('2d');
        this.drawImage();
        this.drawDate();
        this.drawText();
        this.drawEvent();
    }

    render() {
        return (
            <canvas 
            ref={(el)=> this.canvas = el}></canvas>
        )
    }

    drawImage() {
        let img = new Image();

        img.src = this.props.picture ? this.props.picture.url : ``;
        this.cxt.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    }

    drawDate() {
        const DATESTARTY = 70;
        let date = new Date(this.props.date);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        let day = date.getDate();

        this.cxt.textAlign = 'center';
        this.cxt.font = 'bold 1.5rem 微软雅黑';
        this.cxt.fillStyle = 'white';
        this.cxt.fillText(year, this.canvas.width/2, DATESTARTY);

        this.cxt.font = '1.3rem 微软雅黑';
        this.cxt.fillText(month, this.canvas.width/2, DATESTARTY + 20);
        this.cxt.fillText('/', this.canvas.width/2, DATESTARTY + 35);
        this.cxt.fillText(day, this.canvas.width/2, DATESTARTY + 50);
    }

    drawText() {

        const LINEHEIGHT = 21;
        let texts = this.props.text.split('\n');
        let textHeight = texts.length*LINEHEIGHT;

        this.cxt.font = 'bold italic 1.3rem consolas';
        for(let [index, text] of texts.entries()) {
            this.cxt.fillText(text, this.canvas.width/2, this.canvas.height/2 - textHeight/2 + index*LINEHEIGHT);
        }
        
    }

    drawEvent() {
        const EVENTSTARTY = this.canvas.height - 70;

        this.cxt.font = '1.3rem consolas';
        this.cxt.fillText(`宜：${this.props.todo}       忌：${this.props.notTodo}`, this.canvas.width/2, EVENTSTARTY);
    }
    
}

function mapStateToProps(state) {
    return state.calendar;
}

export default connect(mapStateToProps)(Canvas);
