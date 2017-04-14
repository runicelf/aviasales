import ReactDom from 'react-dom';
import React from 'react';
import arrOfTickets from './tickets';
import './app.css';

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        tickets: arrOfTickets.tickets,
        filter: {all: true, 0: false, 1: false, 2: false, 3: false}
      };
    } 
    filterChange(n) {
      const filterProps = this.state.filter;
      filterProps[n] = filterProps[n] === true ? false : true;
      this.setState({filter: filterProps});
      console.log('hi');
    }
    onlyChange(e, n) {
      e.stopPropagation();
      const filterProps = Object.keys(this.state.filter).reduce((acc, elem) => {
        if (elem === n) {
          acc[elem] = true;
          return acc;
        }
        acc[elem] = false;
        return acc;
      }, {});
      //console.log(this.state, filterProps)
      this.setState({filter: filterProps});
    }
    filter() {
      if(this.state.filter.all) {
        return this.state.tickets;
      }
      return this.state.tickets.filter(e => this.state.filter[e.stops]);
    }
    render() {
        return <div className='wrapper'>
          <Filter filter={this.filterChange.bind(this)} state={this.state.filter} onlyChange={this.onlyChange.bind(this)}/>
          <div className='tickets'>
          {
            this.filter().map(e => <Ticket obj={e}/>)
          }
          </div>
        </div>;
    }
}

class Filter extends React.Component {
    isActive(n) {
      if(this.props.state[n]) {
        return 'radio-button_active radio-button';
      }
      return 'radio-button';
    }
    render() {
        return <div className='filter'>
          <b>количество пересадок</b>
          <ul>
            <li onClick={() => this.props.filter('all')}><div className='filter-wrapper'><div className={this.isActive('all')}></div><span>Все</span></div><span onClick={(e) => this.props.onlyChange(e, 'all')} className='only'>только</span></li>
            <li onClick={() => this.props.filter('0')}><div className='filter-wrapper'><div className={this.isActive('0')}></div><span>Без пересадок</span></div><span onClick={(e) => this.props.onlyChange(e, '0')} className='only'>только</span></li>
            <li onClick={() => this.props.filter('1')}><div className='filter-wrapper'><div className={this.isActive('1')}></div><span>1 пересадка</span></div><span onClick={(e) => this.props.onlyChange(e, '1')} className='only'>только</span></li>
            <li onClick={() => this.props.filter('2')}><div className='filter-wrapper'><div className={this.isActive('2')}></div><span>2 пересадки</span></div><span onClick={(e) => this.props.onlyChange(e, '2')} className='only'>только</span></li>
            <li onClick={() => this.props.filter('3')}><div className='filter-wrapper'><div className={this.isActive('3')}></div><span>3 пересадки</span></div><span onClick={(e) => this.props.onlyChange(e, '3')} className='only'>только</span></li>
          </ul>
         </div>;
    }
}

class Ticket extends React.Component {
    getCompanyLogo(name) {
        const arrOfLogo = {
          tk: 'img/tk.png',
          su: 'img/aeroflot.png',
          s7: 'img/s7.png',
          ba: 'img/ba.png',
        };
        return arrOfLogo[name.toLowerCase()];
        
    }
    stopsAmount(n) {
      if(n === 1) {
        return `${n} пересадка`;
      }else if(n >= 2 && n <= 4) {
        return `${n} пересадки`;
      }else if(n < 1) {
        return `без пересадок`;
      }
      else {
        return `${n} пересадок`; 
      }
    }
    
    render() {
        return <div className='ticket'>
          <div className='company-price'>
            <div className='company-logo'>
              <img src={this.getCompanyLogo(this.props.obj.carrier)}/>
            </div>
            <div className='buy-button'>
              <span>Купить</span> <span>за {this.props.obj.price} Р</span>
            </div>
          </div>
          <div className='times'>
            <div className='departure'>
              <div className='time'>
                {this.props.obj.departure_time}
              </div>
              <div className='place'>
                {this.props.obj.origin}, {this.props.obj.origin_name}
              </div>
              <div className='date'>
                {this.props.obj.departure_date}
              </div>
            </div>
            <div className='transfer'>
              {this.stopsAmount(this.props.obj.stops)}
            </div>
            <div className='arrival'>
              <div className='time'>
                {this.props.obj.arrival_time}
              </div>
              <div className='place'>
                {this.props.obj.destination_name}, {this.props.obj.destination}
              </div>
              <div className='date'>
                {this.props.obj.arrival_date}
              </div>
            </div>
          </div>
        </div>;
    }
}

ReactDom.render(<App/>, document.getElementById('root'));