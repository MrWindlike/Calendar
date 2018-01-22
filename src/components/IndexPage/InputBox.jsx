import { List, TextareaItem, InputItem, DatePickerView, ImagePicker, Button, Modal } from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import React from 'react';

class InputBox extends React.Component {
    constructor(props) {
        super(props);
        let date;
        
        if(this.props.date) {
            date = new Date(this.props.date);
        } else {
            date = new Date();
        }
        console.log(this.props)
        this.state = {
            text: this.props.text,
            todo: this.props.todo,
            notTodo: this.props.notTodo,
            date: date,
            files: [],
            picture: null,
            isShowModal: false
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <List renderHeader={()=> '文本信息'}>
                    <TextareaItem
                    title="内容"
                    placeholder=""
                    data-seed="logId"
                    rows="5"
                    value={this.state.text}
                    onChange={(text)=> this.setState({text})}></TextareaItem>
                    <InputItem
                    value={this.state.todo}
                    onChange={(text)=> this.setState({todo: text})}>宜</InputItem>
                    <InputItem
                    value={this.state.notTodo}
                    onChange={(text)=> this.setState({notTodo: text})}>忌</InputItem>
                </List>
                <List renderHeader={()=> '选择日期'}>
                    <DatePickerView
                    mode="date" 
                    value={this.state.date}
                    onChange={(date)=> this.setState({date: date})}/>
                </List>
                <List renderHeader={()=> '选择图片'}>
                    <ImagePicker 
                    files={this.state.files}
                    selectable={this.state.files.length < 1}
                    onChange={(files)=> this.setState({picture: files[0], files})}/>
                </List>
                <Modal
                visible={this.state.isShowModal}
                transparent
                maskClosable={false}
                title="检查是否为填写内容或未选择图片！"
                footer={[{ text: 'Ok', onPress: () => { this.setState({isShowModal: false}) } }]}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                />
                <Button
                type="primary"
                onClick={()=> this.onSubmit()}>生成图片</Button>
            </React.Fragment>
        )
    }

    onSubmit() {
        if(!(this.state.text && this.state.picture)) {
            this.setState({isShowModal: true});
            return ;
        }

        const { text, todo, notTodo, date, picture } = this.state;

        this.props.dispatch({
            type: 'calendar/submit',
            payload: { text, todo, notTodo, picture, date: date.getTime() }
        });

        this.props.dispatch(routerRedux.push('/canvas'));
    }
}

function mapStateToProps(state) {
    return state.calendar;
}


export default connect(mapStateToProps)(InputBox);
