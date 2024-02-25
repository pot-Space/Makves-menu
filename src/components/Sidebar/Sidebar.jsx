import './sidebar.scss';
import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png'

const routes = [
  { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
  { title: 'Sales', icon: 'chart-line', path: '/sales' },
  { title: 'Costs', icon: 'chart-column', path: '/costs' },
  { title: 'Payments', icon: 'wallet', path: '/payments' },
  { title: 'Finances', icon: 'chart-pie', path: '/finances' },
  { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
  { title: 'Settings', icon: 'sliders', path: '/settings' },
  { title: 'Support', icon: 'phone-volume', path: '/support' },
];

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: true,
      isActive: false,
    };
  }

  toggleSidebar = () => {
    this.setState((state) => ({ isOpened: !state.isOpened }));
  };

  onSelect = (path, event) => {
    console.log(`going to "${path}"`);

    this.setState({
      isActive: +event.target.dataset.index,
    })
  }

  render() {
    const { isOpened, isActive } = this.state;
    const containerClassnames = classnames('sidebar', { opened: isOpened });

    return (
      <div className={containerClassnames}>
        <div className="sidebar__dots">
          <div className="red-dot"></div>
          <div className="yellow-dot"></div>
          <div className="green-dot"></div>
        </div>
        <div className="sidebar__logo">
          <img
            src={logo}
            alt="TensorFlow logo"
          />
          <span className={isOpened ? 'appear' : 'disappear'}>TensorFlow</span>
          <button className={isOpened ? 'btn_opened' : 'btn_closed'} onClick={this.toggleSidebar}>
            <FontAwesomeIcon icon={isOpened ? 'angle-left' : 'angle-right'} />
          </button>
        </div>

        <div className="sidebar__main-nav">
          {
            routes.map((route, i) => (
              <div
                key={route.title}
                data-index={i}
                className={i === isActive ? 'nav_active' : ''}
                onClick={(event) => this.onSelect(route.path, event)}
              >
                <FontAwesomeIcon icon={route.icon} />
                <span className={isOpened ? 'appear' : 'disappear'}>{route.title}</span>
              </div>
            ))
          }
        </div>

        <div className="sidebar__support-nav">
          {
            bottomRoutes.map((route) => (
              <div key={route.title} onClick={(event) => this.onSelect(route.path, event.currentTarget)}>
                <FontAwesomeIcon icon={route.icon} />
                <span className={isOpened ? 'appear' : 'disappear'}>{route.title}</span>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
