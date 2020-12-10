import React, {PureComponent} from 'react';

export default class UserForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      password: this.props.user.password,
      phonesNum: this.props.user.phones,
      nameStyle: '',
      emailStyle: '',
      passwordStyle: '',
      colors:'',
    };
   this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();
    const ruleName = /^[а-щА-ЩьЮюЯяЇїІіЄєҐґ]+\s+[а-щА-ЩьЮюЯяЇїІіЄєҐґ]+\s+[а-щА-ЩьЮюЯяЇїІіЄєҐґ]+$/;
    const ruleEmail = /^(?:(?:[a-zA-Z\d\-]+)|(?:[a-zA-Z\d\-]+[a-zA-Z\d\-\.]+[a-zA-Z\d\-]+))@[a-zA-Z\d\-][a-zA-Z\d\-\.]*\.[a-zA-Z\d\-\.]*[a-zA-Z\d\-]$/;
    const rulePassword = /(?=^.{8,}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
    ruleName.test(this.state.name.trim()) ? this.setState({nameStyle: '#C2E0C6'}) : this.setState({nameStyle: '#F9D0C4'});
    ruleEmail.test(this.state.email.trim()) ? this.setState({emailStyle: '#C2E0C6'}) : this.setState({emailStyle: '#F9D0C4'});
    rulePassword.test(this.state.password) ? this.setState({passwordStyle: '#C2E0C6'}) : this.setState({passwordStyle: '#F9D0C4'});
    const colors=[];
    this.state.phonesNum.map((elem, index) => {
      let currentColor;
      if (elem.type === 'home') {
          if (elem.number[0] != 0 && elem.number.length === 6) {
            currentColor='#C2E0C6';
          } else {
            currentColor='#F9D0C4';
          }
        } else {
          if ((elem.number[0] == 0 && elem.number.length === 10) || (elem.number[0] == 3 && elem.number.length === 12)) {
            currentColor='#C2E0C6';
          } else {
            currentColor='#F9D0C4';
          }
        }
      colors.push(currentColor);
      }
    )
    this.setState({colors:colors})
  }

  changePhoneNumber = (e, index) => {
    const newItems = this.state.phonesNum.map((item, i) => {
      if (i === index) {
        return {...item, number: e.target.value};
      } else {
        return {...item};
      }
    });
    this.setState({phonesNum: newItems});
  };
  changePhoneType = (e, index) => {
    const newItems = this.state.phonesNum.map((item, i) => {
      if (i === index) {
        return {...item, type: e.target.value};
      } else {
        return {...item};
      }
    });
    this.setState({phonesNum: newItems});
  };

  deleteRow = (index) => {
    this.setState({
      phonesNum: this.state.phonesNum.filter((_, i) => i !== index)
    });
  };

  render() {
    const blockPhones = this.state.phonesNum.map((elem, index) => {
      return <div className="input-group mb-3" key={index}>
        <input type="text" className="form-control" style={{backgroundColor: this.state.colors[index]}} value={elem.number}
               onChange={event => this.changePhoneNumber(event, index)}/>
        <select className="custom-select" value={elem.type} onChange={event => this.changePhoneType(event, index)}>
          <option value="home">Домашній</option>
          <option value="mobile">Мобільний</option>
        </select>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button"
                  onClick={event => this.deleteRow(index)}>Видалити
          </button>
        </div>
      </div>
    });
    return <div className="container p-5">
      <form id="user-form">
        <div className="form-group">
          <label>П.І.Б.</label>
          <input type="text" name="name" value={this.state.name} style={{backgroundColor: this.state.nameStyle}}
                 onChange={e => this.setState({name: e.target.value})}
                 className="form-control"/>
          <small className="form-text text-muted">Обовʼязково прізвище, імʼя та по батькові. Тільки літерами
            українського алфавіту</small>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" name="email" value={this.state.email} style={{backgroundColor: this.state.emailStyle}}
                 onChange={e => this.setState({email: e.target.value})} className="form-control"/>
          <small className="form-text text-muted">Адреса електронної пошти</small>
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input type="password" name="password" value={this.state.password}
                 style={{backgroundColor: this.state.passwordStyle}}
                 onChange={e => this.setState({password: e.target.value})} className="form-control"/>
          <small className="form-text text-muted">Мінімум 8 літер. Обовʼязково повинні бути великі та малі літери
            англійського алфавіту та числа</small>
        </div>
        {blockPhones}
        <button type="button" className="btn btn-success"
                onClick={() => this.setState({phonesNum: [...this.state.phonesNum, {number: '', type: 'home'}]})}>Add
          phone
          number
        </button>
        <button type="submit" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
      </form>
    </div>
  }
}