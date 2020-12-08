import React, {PureComponent} from 'react';

export default class UserForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      password: this.props.user.password,
      phone: this.props.user.phones[0].type,
      homePhone: this.props.user.phones[0].number,
      mobilePhone: this.props.user.phones[1].number,
      nameStyle: '',
      emailStyle: '',
      passwordStyle: '',
      phoneStyle: '',
      showBlock: true,
    };
    this.phoneTypeChange = this.phoneTypeChange.bind(this);
    this.Change = this.Change.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.inputPhone = this.inputPhone.bind(this);
    this.showGroup=this.showGroup.bind(this);
  }

  phoneTypeChange(event) {
    this.setState({phone: event.target.value});
  }

  Change(event) {
    if(event.target.name==='name') this.setState({name: event.target.value});
    if(event.target.name==='email') this.setState({email: event.target.value});
    if(event.target.name==='password') this.setState({password: event.target.value});
  }

  inputPhone(event) {
    if (this.state.phone === 'home') {
      this.setState({homePhone: event.target.value})
    } else {
      this.setState({mobilePhone: event.target.value})
    }
  }

  submitForm(event) {
    event.preventDefault();
    const ruleName = /^[а-щА-ЩьЮюЯяЇїІіЄєҐґ]+\s+[а-щА-ЩьЮюЯяЇїІіЄєҐґ]+\s+[а-щА-ЩьЮюЯяЇїІіЄєҐґ]+$/;
    const ruleEmail = /^(?:(?:[a-zA-Z\d\-]+)|(?:[a-zA-Z\d\-]+[a-zA-Z\d\-\.]+[a-zA-Z\d\-]+))@[a-zA-Z\d\-][a-zA-Z\d\-\.]*\.[a-zA-Z\d\-\.]*[a-zA-Z\d\-]$/;
    const rulePassword = /(?=^.{8,}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (ruleName.test(this.state.name.trim())) {
      this.setState({nameStyle: '#C2E0C6'});
    } else {
      this.setState({nameStyle: '#F9D0C4'});
    }
    if (ruleEmail.test(this.state.email.trim())) {
      this.setState({emailStyle: '#C2E0C6'});
    } else {
      this.setState({emailStyle: '#F9D0C4'});
    }
    if (rulePassword.test(this.state.password)) {
      this.setState({passwordStyle: '#C2E0C6'});
    } else {
      this.setState({passwordStyle: '#F9D0C4'});
    }
    if (this.state.phone === 'home') {
      if (this.state.homePhone[0] !== 0 && this.state.homePhone.length === 6) {
        this.setState({phoneStyle: '#C2E0C6'});
      } else {
        this.setState({phoneStyle: '#F9D0C4'});
      }
    } else {
      if ((this.state.mobilePhone[0] == 0 && this.state.mobilePhone.length === 10) || (this.state.mobilePhone[0] === 3 && this.state.mobilePhone.length === 12)) {
        this.setState({phoneStyle: '#C2E0C6'});
      } else {
        this.setState({phoneStyle: '#F9D0C4'});
      }
    }
  }
  showGroup(){
    this.setState({showBlock:false})
  }

  render() {
    return <div className="container p-5">
      <form id="user-form">
        <div className="form-group">
          <label>П.І.Б.</label>
          <input type="text" name="name" value={this.state.name} style={{backgroundColor: this.state.nameStyle}}
                 onChange={this.Change}
                 className="form-control"/>
          <small className="form-text text-muted">Обовʼязково прізвище, імʼя та по батькові. Тільки літерами
            українського алфавіту</small>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" name="email" value={this.state.email} style={{backgroundColor: this.state.emailStyle}}
                 onChange={this.Change} className="form-control"/>
          <small className="form-text text-muted">Адреса електронної пошти</small>
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input type="password" name="password" value={this.state.password}
                 style={{backgroundColor: this.state.passwordStyle}}
                 onChange={this.Change} className="form-control"/>
          <small className="form-text text-muted">Мінімум 8 літер. Обовʼязково повинні бути великі та малі літери
            англійського алфавіту та числа</small>
        </div>
        <div>
          {this.state.showBlock?
            (<div className="input-group mb-3">
              <input type="text" className="form-control"
                     style={{backgroundColor: this.state.phoneStyle}}
                     onChange={this.inputPhone}
                     value={this.state.phone === 'home' ? this.state.homePhone : this.state.mobilePhone}/>
              <select className="custom-select" value={this.state.phone} onChange={this.phoneTypeChange}>
                <option value="home">Домашній</option>
                <option value="mobile">Мобільний</option>
              </select>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={this.showGroup}>Видалити</button>
              </div>
            </div>):null
          }
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
      </form>
    </div>
  }
}