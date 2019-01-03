import React,{Component} from 'react'
import Style from './resource.scss'
import Style2 from './settings.scss'

export default class Resource extends Component {
    render() {
        return (
            <section className={Style.wrap}>
                <section className={Style.content}>
                    <div className={Style.bottom}>
                        <div className={Style.right}>
                            <div className={Style.width}>
                                <div className={Style.time}>Resource form</div>
                                <form onSubmit={this.handleSubmit}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className={Style.tag} >name</td>
                                                <td><input className={Style.input} type='text' name='_name' value={this.props.resourcesContainer.state._name} onChange={this.props.resourcesContainer.handleInputChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>description</td>
                                                <td><input className={Style.input} type='text' name='description' value={this.props.resourcesContainer.state.description} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>contact</td>
                                                <td><input className={Style.input}  type='text' name='contact' value={this.props.resourcesContainer.state.contact} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>location</td>
                                                <td><input className={Style.input}  type='text' name='location' value={this.props.resourcesContainer.state.location} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>pragma_boot_path</td>
                                                <td><input className={Style.input} type='text' name='pragma_boot_path' value={this.props.resourcesContainer.state.pragma_boot_path} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>pragma_boot_version</td>
                                                <td><input className={Style.input} type='number' name='pragma_boot_version' value={this.props.resourcesContainer.state.pragma_boot_version} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>python_path</td>
                                                <td><input className={Style.input} type='text' name='python_path' value={this.props.resourcesContainer.state.python_path} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>temp_dir</td>
                                                <td><input className={Style.input} type='text' name='temp_dir' value={this.props.resourcesContainer.state.temp_dir} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>username</td>
                                                <td><input className={Style.input} type='text' name='username' value={this.props.resourcesContainer.state.username} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>deployment_type</td>
                                                <td><input className={Style.input} type='text' name='deployment_type' value={this.props.resourcesContainer.state.deployment_type} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>site_hostname</td>
                                                <td><input className={Style.input} type='text' name='site_hostname' value={this.props.resourcesContainer.state.site_hostname} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>latitute</td>
                                                <td><input className={Style.input} type='text' name='latitude' value={this.props.resourcesContainer.state.latitude} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>longtitute</td>
                                                <td><input className={Style.input} type='text' name='longitude' value={this.props.resourcesContainer.state.longitude} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>total_cpu</td>
                                                <td><input className={Style.input} type='number' name='total_cpu' value={this.props.resourcesContainer.state.total_cpu} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td className={Style.tag}>total_memory</td>
                                                <td><input className={Style.input} type='number' name='total_memory' value={this.props.resourcesContainer.state.total_memory} onChange={this.props.resourcesContainer.handleInputChange}/></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td className={Style.submitBtn}><button name='sendValue' className={Style.ok} onClick={this.props.resourcesContainer.queryConfirmReservation}>submit</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}