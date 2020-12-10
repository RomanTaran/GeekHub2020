import React, {PureComponent} from 'react';
import styled from 'styled-components'

const Input = styled.input`
  background: ${props => props.valid ? '#C2E0C6' : '#F9D0C4'};
`;
export default class UserForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      password: this.props.user.password,
      phonesNum: this.props.user.phones,
      nameValid: true,
      emailValid: true,
      passwordValid: true,
      phoneValid: [true, true, true],
    };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();
    const ruleName = /^[а-щА-ЩьЮюЯяЇїІіЄєҐґ]+\s+[а-щА-ЩьЮюЯяЇїІіЄєҐґ]+\s+[а-щА-ЩьЮюЯяЇїІіЄєҐґ]+$/;
    const ruleEmail = /^(?:(?:[a-zA-Z\d\-]+)|(?:[a-zA-Z\d\-]+[a-zA-Z\d\-.]+[a-zA-Z\d\-]+))@[a-zA-Z\d\-][a-zA-Z\d\-.]*\.[a-zA-Z\d\-.]*[a-zA-Z\d\-]$/;
    const rulePassword = /(?=^.{8,}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
    ruleName.test(this.state.name.trim()) ? this.setState({nameValid: true}) : this.setState({nameValid: false});
    ruleEmail.test(this.state.email.trim()) ? this.setState({emailValid: true}) : this.setState({emailValid: false});
    rulePassword.test(this.state.password) ? this.setState({passwordValid: true}) : this.setState({passwordValid: false});
    const validPhones = [];
    this.state.phonesNum.map((elem) => {
        let validPhone;
        if (elem.type === 'home') {
          validPhone = elem.number[0] != 0 && elem.number.length === 6;
        } else {
          validPhone = (elem.number[0] == 0 && elem.number.length === 10) || (elem.number[0] == 3 && elem.number.length === 12);
        }
        validPhones.push(validPhone);
      }
    )
    this.setState({phoneValid: validPhones})
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
        <Input type="text" className="form-control" valid={this.state.phoneValid[index]}
               value={elem.number}
               onChange={event => this.changePhoneNumber(event, index)}/>
        <select className="custom-select" value={elem.type} onChange={event => this.changePhoneType(event, index)}>
          <option value="home">Домашній</option>
          <option value="mobile">Мобільний</option>
        </select>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button"
                  onClick={() => this.deleteRow(index)}>Видалити
          </button>
        </div>
      </div>
    });
    return <div className="container p-5">
      <form id="user-form">
        <div className="form-group">
          <label>П.І.Б.</label>
          <Input type="text" name="name" value={this.state.name} valid={this.state.nameValid}
                 onChange={e => this.setState({name: e.target.value})}
                 className="form-control"/>
          <small className="form-text text-muted">Обовʼязково прізвище, імʼя та по батькові. Тільки літерами
            українського алфавіту</small>
        </div>
        <div className="form-group">
          <label>Email</label>
          <Input type="text" name="email" value={this.state.email} valid={this.state.emailValid}
                 onChange={e => this.setState({email: e.target.value})} className="form-control"/>
          <small className="form-text text-muted">Адреса електронної пошти</small>
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <Input type="password" name="password" value={this.state.password}
                 valid={this.state.passwordValid}
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