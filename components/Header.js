import NProgress from 'nprogress'
import Router from 'next/router'
import Link from 'next/link'
import Meta from './Meta'
import GlobalStyles from './GlobalStyles'
import LinkIcon from './LinkIcon'
import FilterIcon from './FilterIcon'
import { logEvent } from '../lib/analytics'

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = url => {
  logEvent('Navigation', `Navigated to ${url}`)
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

export default props => (
  <header>
    <Meta title={props.title} />
    <GlobalStyles />
    <Link href='/'>
      <a className='logo'>
        <LinkIcon />
        <h1>
          <span>Link</span>
          <span>let</span>
        </h1>
      </a>
    </Link>
    <nav>
      <ul>
        {props.about &&
          <li>
            <Link href='/about'>
              <a>About</a>
            </Link>
          </li>}
        {props.home &&
          <li>
            <Link href='/'>
              <a>Back To Home</a>
            </Link>
          </li>}
        {props.about &&
          <li className='filterBtn'>
            <a onClick={props.toggleFilter} href='#'>
              <FilterIcon />
            </a>
          </li>}
      </ul>
    </nav>
    <style jsx>
      {
        `
      header {
        background: #253592;
        height: 56px;
        width: 100%;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
        display: flex;
        align-items: center;
      }
      nav {
        width: 100%;
        padding: 0 40px;
      }
      nav ul {
        display: flex;
        justify-content: flex-end;
        list-style: none;
      }
      nav ul li {
        margin: 0 20px;
      }
      nav ul li a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
      }
      nav ul li a:hover {
        color: #ccc;
      }
      .filterBtn {
        display: none;
      }
      .logo {
        display: flex;
        align-items: center;
        margin-left: 20px;
        text-decoration: none;
      }
      .logo h1 {
          margin: 0;
          padding: 0 5px;
          font-size: 24px;
          line-height: 56px;
          color: #FFF;
          text-align: center;
        }
        .logo h1 span:first-child {
          color: #FFD15C;
        }
        .logo h1 span {
          color: #FF7058;
        }
        @media(max-width: 720px) {
          .filterBtn {
            display: block;
          }
        }
      `
      }
    </style>
  </header>
)