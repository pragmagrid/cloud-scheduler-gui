import React, { Component } from 'react'
import Reservation from './reservation'
import axios from 'axios'
import moment from 'moment'
import {CHECK_RESERVATION_ENDPOINT,CONFIRM_RESERVATION_ENDPOINT,CHECK_CONNECTION_TYPE_ENDPOINT} from '../../config/endpoints'
import SuccessDialog from './successDialog'
import ErrorDialog from './errorDialog'

export default class ReservationContainer extends Component {
    constructor(props){
        super(props)
        this.appContainer = this.props.dashBoardContainer.props.app
        this.dashboardContainer = this.props.dashBoardContainer
        this.timezone = moment.tz(this.appContainer.state.authen.timezone)
        this.sites = this.props.sites

        this.state = {
            // STEP1
            startDate: {
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            endDate: {
                obj: this.timezone,
                date: this.timezone.format('YYYY-MM-DD')
            },
            startTime: this.timezone.format().slice(11,13)+':00',
            endTime: this.timezone.add(1,'hours').format().slice(11,13)+':00',
            reservationLength: '',
            imageType: 'Any',
            cpu: [],
            mem: [],

            // STEP2
            title: '',
            description: '',

            // OTHER
            card: 'step1',
            dialog: 'main',
            alertNode: {},
            siteInputCPUDom: [],
            siteInputMEMDom: []
        }

        this.onStartDateChange = this.onStartDateChange.bind(this)
        this.onEndDateChange = this.onEndDateChange.bind(this)
        this.onTimeChange = this.onTimeChange.bind(this)
        this.onImageTypeChange = this.onImageTypeChange.bind(this)
        this.onPreviousStep = this.onPreviousStep.bind(this)
        this.onNextStep = this.onNextStep.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onEnterCPU = this.onEnterCPU.bind(this)
        this.onEnterMEM = this.onEnterMEM.bind(this)
        this.setCPUAndMEM = this.setCPUAndMEM.bind(this)
        this.onEnterInputStep2 = this.onEnterInputStep2.bind(this)
    }

    onClose(){
        this.dashboardContainer.onCloseModal()
    }

    setReservationLength(){
        let startDate = this.state.startDate.date
        let endDate = this.state.endDate.date
        let {startTime,endTime} = this.state
        let start = moment(startDate+' '+startTime,'YYYY-MM-DD HH:mm')
        let end = moment(endDate+' '+endTime,'YYYY-MM-DD HH:mm')

        let day = end.diff(start,'days')
        let hour = end.diff(start,'hours')
        let length = ''
        if(day>=1){
            length = day+' Days, '+(hour-(24*day))+' Hours'
        }else{
            length = day+' Days, '+hour+' Hours'
        }
        this.setState({
            reservationLength: length
        })
    }

    onStartDateChange(date) {
        if(date.format()<this.state.endDate.obj.format()){
            this.setState({
                startDate:{
                    obj: date,
                    date: moment(date).format('YYYY-MM-DD')
                } 
            },this.setReservationLength)
        }else{
            this.setState({
                startDate:{
                    obj: date,
                    date: moment(date).format('YYYY-MM-DD')
                }, 
                endDate:{
                    obj: date,
                    date: moment(date).format('YYYY-MM-DD')
                } 
            },this.setReservationLength)
            let startTime = parseInt(this.state.startTime.replace(':00'))
            let endTime = parseInt(this.state.endTime.replace(':00'))
            if(endTime<=startTime){
                let time = ((startTime+1)>=23) ? 23 : (startTime+1)
                if((startTime+1)<=23){
                    this.setState({
                        endTime: ((time)>=10) ? (time)+':00' : '0'+(time)+':00'
                    },this.setReservationLength)
                }else{
                    this.setState({
                        endDate:{
                            obj: moment(date).add(1,'days'),
                            date: moment(date).add(1,'days').format('YYYY-MM-DD')
                        },
                        endTime: '00:00'
                    },this.setReservationLength)
                }
            }
        }
    }

    onEndDateChange(date) {
        if(date.format()>=this.state.startDate.obj.format()){
            this.setState({
                endDate:{
                    obj: date,
                    date: moment(date).format('YYYY-MM-DD')
                } 
            },this.setReservationLength)
        }
    }

    onTimeChange(event){
        let name = event.target.name
        this.setState({
            [name]: event.target.value
        },this.setReservationLength)
    }

    onImageTypeChange(event){
        this.setState({
            imageType: event.target.value
        })
    }

    onPreviousStep(event){
        switch(event.target.name){
            case 'step1' : this.onClose();break
            case 'step2' : this.setState({card: 'step1'});break
            case 'step3' : this.setState({card: 'step2'});break
        }
    }

    onNextStep(event){
        switch(event.target.name){
            case 'step1' : this.checkReservation();break
            case 'step2' : this.setState({card: 'step3'});break
            case 'step3' : this.queryConfirmReservation();break
        }
    }

    checkStep1Input(){
        let empty = false
        this.state.siteInputCPUDom.map((data)=>{
            if(data.value==''){
                if(empty==false){
                    data.focus()
                }
                data.style.border = '1px solid red'
                empty = true
            }else{
                data.style.border = '1px solid #464a5f'
            }
        })
        this.state.siteInputMEMDom.map((data)=>{
            if(data.value==''){
                if(empty==false){
                    data.focus()
                }
                empty = true
                data.style.border = '1px solid red'
            }else{
                data.style.border = '1px solid #464a5f'
            }
        })
        return empty
    }

    setCPUAndMEM(index){
        let {cpu,mem} = this.state
        cpu[index] = ''
        mem[index] = ''
        this.setState({
            cpu: cpu,
            mem: mem
        })
    }

    onEnterCPU(event){
        let name = event.target.name
        let value = event.target.value
        let REGEX = /^\d+$/
        if (value.match(REGEX)) {
            let {cpu} = this.state
            cpu[parseInt(name)] = value
            this.setState({
                cpu: cpu
            })
        } else {
            if (value.length <= 1) {
                let {cpu} = this.state
                cpu[parseInt(name)] = ''
                this.setState({
                    cpu: cpu
                })
            }
        }
    }

    onEnterMEM(event){
        let name = event.target.name
        let value = event.target.value
        let REGEX = /^\d+$/
        if (value.match(REGEX)) {
            let {mem} = this.state
            mem[parseInt(name)] = value
            this.setState({
                mem: mem
            })
        } else {
            if (value.length <= 1) {
                let {mem} = this.state
                mem[parseInt(name)] = ''
                this.setState({
                    mem: mem
                })
            }
        }
    }

    onEnterInputStep2(event){
        let name = event.target.name
        this.setState({
            [name]: event.target.value
        })
    }

    queryCheckConnectionType(){
        let {selectCard} = this.dashboardContainer.state
        let type = ''
        selectCard.map((data,key)=>{
            let subType = ''
            data.connection.map((subData,subKey)=>{
                if(subKey==0){
                    subType += subData.name
                }else{
                    subType += ','+subData.name
                }
            })
            if(key==0){
                type += (subType=='') ? '-' : subType
            }else{
                type += '|'+((subType=='') ? '-' : subType)
            }
        })

        let params = {
            params:{
                connection_type: type
            }
        }
        axios.get(CHECK_CONNECTION_TYPE_ENDPOINT,params).then(response=>{
            let {data,status} = response
            if(status==200&&data.result){
                if(data.result=='True'){
                    this.queryCheckReservation()
                }else{
                    this.state.alertNode.innerHTML = 'The resource are not same connection type. Please try again.'
                    this.state.alertNode.style.display = 'block'
                }
            }
        }).catch(error=>{
            console.log('QUERRY CHECK CONNECTION TYPE ERROR: ',+error)
        })
    }

    checkReservation(){
        if(this.checkStep1Input()==false){
            let {selectCard,reserveMode} = this.dashboardContainer.state
            if(selectCard.length>1){
                if(reserveMode=='multiple'){
                    this.queryCheckConnectionType()
                }else{
                    this.queryCheckReservation()
                }
            }else{
                this.queryCheckReservation()
            }
        }
    }

    queryConfirmReservation(){
        let sitesId = ''
        let resources = ''
        this.sites.map((data,key)=>{
            if(key==0){
                sitesId += data.id
                resources += this.state.cpu[key]+','+this.state.mem[key]
            }else{
                sitesId += ','+data.id
                resources += '|'+this.state.cpu[key]+','+this.state.mem[key]
            }
        })

        let params = {
            params:{
                session_id: this.appContainer.state.authen.session,
                begin: this.state.startDate.date+' '+this.state.startTime+':00',
                end: this.state.endDate.date+' '+this.state.endTime+':00',
                sites_id: sitesId,
                resources: resources,
                img_type: this.state.imageType,
                title: (this.state.title!='') ? this.state.title : '-',
                description: (this.state.description!='') ? this.state.description : '-',
                type: this.dashboardContainer.state.reserveMode
            }
        }

        axios.get(CONFIRM_RESERVATION_ENDPOINT,params).then(response=>{
            let {data,status} = response
            if(status==200&&data.result){
                if(data.result=='success'){
                    this.changeDialog('success')
                }else{
                    this.changeDialog('error')
                }
            }
        }).catch(error=>{
            console.log('QUERY CONFIRM RESERVATION ERROR: '+error)
        })
    }

    queryCheckReservation(){
        let sitesId = ''
        let resources = ''
        this.sites.map((data,key)=>{
            if(key==0){
                sitesId += data.id
                resources += this.state.cpu[key]+','+this.state.mem[key]
            }else{
                sitesId += ','+data.id
                resources += '|'+this.state.cpu[key]+','+this.state.mem[key]
            }
        })

        let params = {
            params:{
                session_id: this.appContainer.state.authen.session,
                begin: this.state.startDate.date+' '+this.state.startTime+':00',
                end: this.state.endDate.date+' '+this.state.endTime+':00',
                sites_id: sitesId,
                resources: resources,
                img_type: this.state.imageType
            }
        }

        axios.get(CHECK_RESERVATION_ENDPOINT,params).then(response=>{
            let {data,status} = response
            if(status==200&&data.result){
                if(data.result=='True'){
                    this.state.alertNode.innerHTML = 'The resource are not available enough. Please try again.'
                    this.state.alertNode.style.display = 'none'
                    this.setState({card: 'step2'})
                }else{
                    this.state.alertNode.innerHTML = 'The resource are not available enough. Please try again.'
                    this.state.alertNode.style.display = 'block'
                }
            }
        }).catch(error=>{
            console.log('QUERY CHECK RESERVATION ERROR: '+error)
        })
    }

    changeDialog(name){
        this.setState({
            dialog: name
        })
    }

    componentWillMount(){
        this.setReservationLength()
    }

    onCloseDialog(){
        this.dashboardContainer.onCloseModal()
    }

    render() {
        let dialog
        switch(this.state.dialog){
            case 'main' : dialog = <Reservation reservationContainer={this}/>;break;
            case 'success' : dialog = <SuccessDialog onCloseDialog={()=>this.onCloseDialog()}/>;break;
            case 'error' : dialog = <ErrorDialog onCloseDialog={()=>this.onCloseDialog()}/>;break;
        }
        return (
            // <section>
            <section className='modal'>
                {dialog}
            </section>
            // </section>
        )
    }
}