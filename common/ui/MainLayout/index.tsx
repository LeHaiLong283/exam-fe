import { PUBLIC_ROUTER, ROUTES } from '@constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HeaderWrap, Layout, FooterWrap } from './index.style';
import { Dropdown, Menu, MenuProps, Space } from 'antd';
import { doLogout, getheaderInfo } from '@api';
import { Message, reactLocalStorage } from '@utils';
import { useRouter } from 'next/router';
import Config from '@root/config';
import Icon from '@ant-design/icons/lib/components/Icon';
import { IconUser } from '@ui/Svgs';
import { isEmpty } from 'lodash';
import { Cookies } from 'react-cookie';
import { useToeicContext } from '@contexts/toeicContext';

const MainLayout = (props) => {
  const router = useRouter();

  const { userInfos, topics } = useToeicContext();

  const onLogoutClick = async () => {
    try {
      const resp: any = await doLogout();
      const error = resp.data?.error;
      if (error) {
        Message.error(error?.message ?? 'Something error!');
      } else {
        onLogoutSuccess();
      }
    } catch (err) {
      console.log('logout-error :>> ', err.toString());
    } finally {
    }
    onLogoutSuccess();
  };
  const onLogoutSuccess = () => {
    reactLocalStorage.clear();
    const cookies = new Cookies();
    cookies.remove(Config.AUTH_TOKEN_KEY);
    router.push(ROUTES.WELCOME);
  };

  const onRouterPush = (route) => {
    router.push(route);
  };
  const menu = (
    <Menu
      items={[
        {
          key: '2',
          label: (
            <Link href={`${ROUTES.USER}/${userInfos?.userId}`}>
              <div>
                <span className="sub-title">View Profile</span>
              </div>
            </Link>
          ),
        },
        {
          key: '4',
          label: (
            <div className="sub-title" onClick={onLogoutClick}>
              Logout
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <Layout className={`${PUBLIC_ROUTER.includes(router.pathname) ? 'public-page' : ''}`}>
      {!PUBLIC_ROUTER.includes(router.pathname) ? (
        <HeaderWrap>
          <div className="container heading-wrap">
            <Menu className="heading-menu" mode="horizontal">
              <Menu.Item key="home" onClick={() => onRouterPush(ROUTES.HOME)}>
                Home
              </Menu.Item>
              {topics.map((topic) => (
                <Menu.SubMenu key={topic.id} title={topic.name}>
                  {topic?.topics?.map((item) => (
                    <Menu.Item key={item.topicId}>
                      <Link href={`/practice/${item?.topicId}`}>{item.topicName}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))}
              <Menu.Item key="test-3">
                <Link href={ROUTES.MINI_TEST}>{'Mini Test'}</Link>
              </Menu.Item>
            </Menu>
            {!isEmpty(userInfos) ? (
              <Dropdown overlay={menu}>
                <span className="user-dropdown-title">
                  <Icon component={IconUser} className="mr-2" /> Hello, {userInfos?.displayName}
                </span>
              </Dropdown>
            ) : (
              <span className="btn-login">
                <Link href={ROUTES.SIGNIN}>Login</Link>
              </span>
            )}
          </div>
        </HeaderWrap>
      ) : (
        <></>
      )}

      <main className={`main-content-layout ${props?.className ?? ''}`}>{props.children}</main>
      <FooterWrap>
        <div className="footer-below ">
          <div className="container footer-below-wrap ">
            <div className="license">
              TOEIC is a registered trademark of Educational Testing Service (ETS). This web is not
              affiliated with or endorsed by Educational Testing Service.
            </div>
            <div className="social-main-panel">
              <div className="social-label">Connect with us</div>
              <div className="social-link-icons">
                <a href="https://www.facebook.com/#" rel="nofollow noopener" target="_blank">
                  <svg
                    className="social-item-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="38px"
                    height="38px"
                    viewBox="0 0 38 37"
                    version="1.1"
                  >
                    <path
                      stroke="none"
                      fillRule="nonzero"
                      fill="rgb(29.411765%,67.45098%,100%)"
                      fillOpacity={1}
                      d="M 19.164062 0.125 C 29.210938 0.109375 37.539062 8.390625 37.535156 18.394531 C 37.53125 28.570312 29.335938 36.867188 19.273438 36.882812 C 9.09375 36.898438 0.753906 28.695312 0.75 18.664062 C 0.746094 8.371094 8.921875 0.136719 19.164062 0.125 Z M 21.210938 29.625 C 21.210938 25.914062 21.210938 22.285156 21.210938 18.558594 C 22.375 18.558594 23.414062 18.558594 24.460938 18.558594 C 24.460938 17.011719 24.460938 15.5625 24.460938 13.980469 C 23.359375 13.980469 22.320312 13.980469 21.300781 13.980469 C 21.074219 12.132812 21.25 11.917969 22.933594 11.898438 C 23.4375 11.890625 23.941406 11.894531 24.472656 11.894531 C 24.472656 10.296875 24.472656 8.84375 24.472656 7.351562 C 23.160156 7.351562 21.898438 7.328125 20.640625 7.355469 C 18.242188 7.410156 16.492188 9.140625 16.386719 11.558594 C 16.351562 12.359375 16.378906 13.164062 16.378906 14.039062 C 15.417969 14.039062 14.644531 14.039062 13.828125 14.039062 C 13.828125 15.589844 13.828125 17.066406 13.828125 18.605469 C 14.675781 18.605469 15.449219 18.605469 16.332031 18.605469 C 16.332031 22.308594 16.332031 25.941406 16.332031 29.625 C 17.964844 29.625 19.488281 29.625 21.210938 29.625 Z M 21.210938 29.625"
                    />
                    <path
                      stroke="none"
                      fillRule="nonzero"
                      fill="rgb(100%,100%,100%)"
                      fillOpacity={1}
                      d="M 21.210938 29.625 C 19.488281 29.625 17.964844 29.625 16.332031 29.625 C 16.332031 25.941406 16.332031 22.308594 16.332031 18.605469 C 15.449219 18.605469 14.675781 18.605469 13.828125 18.605469 C 13.828125 17.066406 13.828125 15.589844 13.828125 14.039062 C 14.640625 14.039062 15.414062 14.039062 16.378906 14.039062 C 16.378906 13.160156 16.347656 12.359375 16.382812 11.558594 C 16.488281 9.140625 18.242188 7.40625 20.640625 7.355469 C 21.898438 7.324219 23.15625 7.351562 24.472656 7.351562 C 24.472656 8.84375 24.472656 10.296875 24.472656 11.894531 C 23.941406 11.894531 23.4375 11.890625 22.933594 11.898438 C 21.25 11.917969 21.070312 12.136719 21.300781 13.980469 C 22.320312 13.980469 23.355469 13.980469 24.460938 13.980469 C 24.460938 15.5625 24.460938 17.011719 24.460938 18.558594 C 23.417969 18.558594 22.375 18.558594 21.210938 18.558594 C 21.210938 22.285156 21.210938 25.914062 21.210938 29.625 Z M 21.210938 29.625 "
                    />
                  </svg>
                </a>
                <a href="https://www.tiktok.com/#" rel="nofollow noopener" target="_blank">
                  <svg
                    className="social-item-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width={38}
                    height={38}
                    viewBox="0 0 38 38"
                    fill="none"
                  >
                    <circle cx={19} cy={19} r={19} fill="#010101" />
                    <path
                      d="M30.2376 12.9215C29.0023 12.6572 27.8836 12.0053 27.0448 11.0608C26.2059 10.1162 25.6907 8.9284 25.5742 7.67051V7.125H21.3128V24.037C21.3101 24.7857 21.073 25.5148 20.6346 26.1217C20.1963 26.7287 19.5787 27.1831 18.8688 27.421C18.1589 27.6589 17.3923 27.6684 16.6767 27.4481C15.9611 27.2279 15.3325 26.789 14.8793 26.193C14.419 25.5871 14.1636 24.8504 14.1503 24.0896C14.1369 23.3288 14.3662 22.5835 14.805 21.9618C15.2438 21.3402 15.8691 20.8744 16.5904 20.6321C17.3117 20.3898 18.0915 20.3835 18.8166 20.6143V16.2848C17.1996 16.0613 15.5533 16.3488 14.1078 17.107C12.6623 17.8652 11.49 19.0563 10.7548 20.5137C10.0196 21.971 9.75825 23.6217 10.0074 25.2349C10.2565 26.848 11.0037 28.343 12.1443 29.5106C13.232 30.6236 14.6268 31.3872 16.1504 31.7039C17.6741 32.0207 19.2576 31.8762 20.6988 31.2889C22.14 30.7017 23.3735 29.6983 24.2419 28.4068C25.1102 27.1154 25.5741 25.5945 25.5742 24.0382V15.3967C27.2964 16.6279 29.3613 17.2881 31.4783 17.2843V13.0501C31.0614 13.0506 30.6455 13.0075 30.2376 12.9215Z"
                      fill="#EE1D52"
                    />
                    <path
                      d="M28.872 11.9122C27.6367 11.648 26.518 10.996 25.6792 10.0515C24.8403 9.10693 24.3251 7.91913 24.2086 6.66123V6.11572H19.9472V23.0277C19.9445 23.7764 19.7074 24.5055 19.269 25.1125C18.8307 25.7194 18.2131 26.1738 17.5032 26.4117C16.7933 26.6496 16.0267 26.6591 15.3111 26.4389C14.5955 26.2186 13.9669 25.7797 13.5137 25.1838C13.0534 24.5779 12.798 23.8411 12.7847 23.0803C12.7713 22.3195 13.0006 21.5742 13.4394 20.9526C13.8782 20.3309 14.5035 19.8651 15.2248 19.6228C15.9461 19.3805 16.7259 19.3743 17.451 19.605V15.2756C15.834 15.052 14.1877 15.3395 12.7422 16.0977C11.2967 16.856 10.1244 18.0471 9.38917 19.5044C8.65395 20.9617 8.39265 22.6124 8.64179 24.2256C8.89093 25.8388 9.63807 27.3337 10.7787 28.5013C11.8664 29.6143 13.2612 30.3779 14.7848 30.6946C16.3085 31.0114 17.892 30.8669 19.3332 30.2797C20.7744 29.6924 22.0079 28.689 22.8763 27.3976C23.7446 26.1061 24.2085 24.5852 24.2086 23.0289V14.3874C25.9308 15.6186 27.9957 16.2788 30.1127 16.275V12.0409C29.6958 12.0414 29.2799 11.9983 28.872 11.9122Z"
                      fill="#69C9D0"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M30.1127 12.8934C29.0508 12.6421 28.0804 12.1031 27.3071 11.3377C26.6969 11.01 26.1449 10.5758 25.6792 10.0514C24.9442 9.22383 24.4577 8.20955 24.2701 7.125H21.3128V24.037C21.3101 24.7857 21.073 25.5148 20.6346 26.1217C20.1963 26.7287 19.5787 27.1831 18.8688 27.421C18.1589 27.6589 17.3923 27.6684 16.6767 27.4481C16.0122 27.2436 15.4228 26.8506 14.9791 26.3183C14.4014 26.076 13.8954 25.6855 13.5137 25.1837C13.0534 24.5778 12.798 23.841 12.7847 23.0802C12.7713 22.3194 13.0007 21.5741 13.4394 20.9525C13.8782 20.3308 14.5036 19.865 15.2249 19.6227C15.9462 19.3804 16.7259 19.3742 17.451 19.6049V16.2166C16.2898 16.2601 15.1469 16.5619 14.1078 17.107C12.6623 17.8652 11.49 19.0563 10.7548 20.5137C10.0196 21.971 9.75825 23.6217 10.0074 25.2349C10.2565 26.848 11.0037 28.343 12.1443 29.5106C12.2388 29.6073 12.3355 29.7013 12.4345 29.7926C13.1603 30.2158 13.9534 30.5217 14.7849 30.6945C16.3085 31.0113 17.892 30.8668 19.3332 30.2796C20.7744 29.6923 22.0079 28.6889 22.8763 27.3975C23.7447 26.106 24.2085 24.5851 24.2086 23.0288V14.3873C25.9308 15.6185 27.9957 16.2787 30.1127 16.2749V12.8934Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a href="https://www.youtube.com/#" rel="nofollow noopener" target="_blank">
                  <svg
                    className="social-item-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width={38}
                    height={38}
                    viewBox="0 0 38 38"
                    fill="none"
                  >
                    <circle cx={19} cy={19} r={19} fill="white" />
                    <path
                      d="M17.8984 0.046875C16.4609 0.191406 15.9531 0.257812 15.125 0.425781C12.2734 1.00391 9.1875 2.48438 6.91406 4.37109C3.23047 7.42578 0.84375 11.7422 0.183594 16.5664C0.00781244 17.8438 0.00781244 20.1562 0.183594 21.4336C1.0625 27.8633 4.92578 33.2344 10.6797 36.0312C14.7656 38.0234 19.0312 38.4805 23.5234 37.4141C26.0898 36.8086 28.8203 35.4531 30.9766 33.7148C34.0234 31.2578 36.3945 27.5664 37.3633 23.7734C38.1133 20.793 38.1602 17.8281 37.5 14.8203C36.9062 12.1211 35.5078 9.24219 33.6992 7C30.75 3.34375 26.2031 0.8125 21.4688 0.191406C20.5664 0.0703125 18.4766 -0.015625 17.8984 0.046875ZM13.6328 6.92969C13.6953 7.15234 13.9062 7.94141 14.1055 8.67969C14.3047 9.42578 14.4766 10.0156 14.4922 10.0078C14.5 9.99219 14.7148 9.21875 14.957 8.27734L15.3984 6.57422L16.1406 6.55078C16.8281 6.52734 16.8789 6.54297 16.8398 6.66406C16.8203 6.74219 16.4375 7.98828 15.9961 9.4375L15.1992 12.0781V15.8828H13.7578V12.0312L13.4961 11.0898C13.3516 10.5703 12.957 9.33984 12.625 8.35938C12.2812 7.37891 12.0078 6.56641 12.0078 6.55078C12.0078 6.54297 12.3516 6.53516 12.7617 6.53516H13.5195L13.6328 6.92969ZM19.3125 8.90625C19.7148 9.01953 20.1641 9.42578 20.375 9.85547C20.5586 10.2148 20.5586 10.2617 20.5586 12.3516C20.5586 14.7422 20.5352 14.8672 20.0469 15.3984C19.6445 15.832 19.2266 15.9844 18.5508 15.9453C18.1094 15.9219 17.9648 15.875 17.6914 15.6875C17.3281 15.4297 17.0625 15.0781 16.9414 14.6758C16.8203 14.2734 16.7656 11.4922 16.8633 10.6875C16.9844 9.69141 17.3281 9.1875 18.082 8.92188C18.4219 8.80078 18.9297 8.79297 19.3125 8.90625ZM22.875 11.7344C22.875 14.1758 22.8906 14.5977 22.9883 14.6992C23.1484 14.8516 23.4922 14.7305 23.75 14.4258L23.9414 14.1953V8.89062H25.2305V15.8828H23.9414V15.1914L23.582 15.4961C23.1484 15.8594 22.8984 15.9609 22.457 15.9609C22.1914 15.9609 22.0859 15.9141 21.9023 15.7383C21.7812 15.6094 21.6602 15.4062 21.6289 15.2695C21.6055 15.1406 21.5859 13.6484 21.5859 11.9609V8.89062H22.875V11.7344ZM24.207 17.1836C25.0859 17.2227 26.0898 17.2891 26.4492 17.3359C27.543 17.457 28.3008 17.9453 28.7422 18.8008C29.2227 19.7383 29.4648 23.332 29.2617 26.6367C29.125 28.8633 28.8867 29.7383 28.2188 30.4141C27.7188 30.9258 27.1914 31.1367 26.1836 31.2344C22.9531 31.5391 14.918 31.5391 11.7969 31.2266C10.9297 31.1445 10.5352 31.0234 10.0547 30.6797C9.06641 29.9805 8.76953 28.7969 8.6875 25.1953C8.61719 22.1914 8.80859 19.957 9.21094 18.9375C9.49219 18.2188 10.2539 17.5781 11.0352 17.4102C12.5312 17.0859 19.5469 16.9648 24.207 17.1836Z"
                      fill="#FF0000"
                    />
                    <path
                      d="M18.4219 10.0938C18.1953 10.2461 18.1641 10.5117 18.1641 12.3867C18.1641 14.6211 18.1953 14.7422 18.6953 14.7422C18.9375 14.7422 19.0234 14.707 19.1289 14.5391C19.25 14.3555 19.2656 14.1211 19.2656 12.3867C19.2656 10.6562 19.25 10.418 19.1289 10.2383C19.0313 10.0859 18.9297 10.0312 18.75 10.0312C18.6211 10.0312 18.4688 10.0625 18.4219 10.0938Z"
                      fill="#FF0000"
                    />
                    <path
                      d="M10.2617 20.1406V20.7461H11.7031L11.7188 24.7148L11.7422 28.6914H13.0352L13.0586 24.7148L13.0703 20.7461H14.5547L14.5312 20.1406L14.5 19.5312H10.2617V20.1406Z"
                      fill="#FF0000"
                    />
                    <path
                      d="M19.457 24.1289V28.7266H20.5977V28.3867C20.5977 28.1953 20.6094 28.043 20.6172 28.043C20.6328 28.043 20.7852 28.1719 20.9609 28.332C21.2578 28.6055 21.6914 28.8047 22.0039 28.8047C22.3047 28.8047 22.6406 28.5625 22.8164 28.2109C22.9883 27.8633 22.9883 27.8086 22.9883 25.2695C22.9883 22.7305 22.9883 22.6797 22.8164 22.3672C22.7227 22.1836 22.5508 21.9961 22.4219 21.9258C21.9727 21.6914 21.3242 21.8516 20.9062 22.2969C20.8008 22.4062 20.6953 22.4961 20.6562 22.4961C20.625 22.4961 20.5977 21.8281 20.5977 21.0156V19.5312H19.457V24.1289ZM21.6523 23.0742C21.8047 23.2617 21.8125 23.3711 21.8125 25.2461C21.8125 26.8594 21.7891 27.2539 21.6992 27.4375C21.5078 27.8008 21.1367 27.8086 20.7344 27.4531C20.6094 27.3438 20.5977 27.1406 20.5977 25.2539V23.1797L20.8477 23.0273C21.1875 22.8164 21.4609 22.832 21.6523 23.0742Z"
                      fill="#FF0000"
                    />
                    <path
                      d="M25.2031 21.9258C24.7617 22.0781 24.3359 22.543 24.207 22.9883C24.0547 23.5234 24 24.9141 24.0703 26.2969C24.1211 27.3008 24.1602 27.5273 24.3125 27.8398C24.6562 28.5469 25.4961 28.918 26.3281 28.7344C27.1992 28.5391 27.6406 27.9688 27.7187 26.9414L27.7617 26.3711H26.5469L26.5 26.8828C26.4727 27.3125 26.4336 27.4219 26.2578 27.5664C26.0391 27.7617 25.9375 27.7773 25.6484 27.6641C25.332 27.543 25.2227 27.1719 25.2461 26.2734L25.2695 25.4961L26.5078 25.4766L27.7383 25.4609V24.6484C27.7383 23.0508 27.4883 22.3828 26.7461 22.0078C26.2891 21.7813 25.6953 21.75 25.2031 21.9258ZM26.2891 23.0195C26.4727 23.2031 26.5391 23.5391 26.5078 24.0938L26.4844 24.5117H25.2695V23.8867C25.2773 23.332 25.293 23.2422 25.4609 23.0664C25.6797 22.832 26.0742 22.8086 26.2891 23.0195Z"
                      fill="#FF0000"
                    />
                    <path
                      d="M14.8359 25.0742C14.8594 28.1719 14.8672 28.2656 15.0195 28.4766C15.3672 28.9492 16.1211 28.8555 16.7656 28.2578L17.0938 27.9609L17.1133 28.3242L17.1367 28.6914L17.7305 28.7109L18.3164 28.7344V21.8867H17.1016V27.1758L16.8555 27.4141C16.5078 27.7461 16.2422 27.8008 16.082 27.582C15.9766 27.4219 15.9609 27.0547 15.9609 24.6484V21.8867H14.8125L14.8359 25.0742Z"
                      fill="#FF0000"
                    />
                  </svg>
                </a>
                <a href="https://twitter.com/#" rel="nofollow noopener" target="_blank">
                  <svg
                    className="social-item-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width={38}
                    height={38}
                    viewBox="0 0 38 38"
                    fill="none"
                  >
                    <circle cx={19} cy={19} r={19} fill="#20E4FF" />
                    <path
                      d="M28.2725 11.4268C28.0918 12.0423 27.7789 12.4397 27.4402 12.8242C27.3483 12.9292 27.1305 13.0019 27.2628 13.2039C27.3692 13.3654 27.516 13.3315 27.687 13.2701C27.9257 13.1861 28.2547 13.0423 28.3934 13.3315C28.4966 13.548 28.2386 13.8033 28.0483 13.9131C26.916 14.5626 26.9515 15.6579 26.8176 16.7581C26.1854 21.9796 22.0499 26.4191 16.408 26.6291C14.1258 26.7147 11.9887 26.3028 10 25.0491C11.9048 25.0055 13.6693 24.5709 15.3258 23.3576C14.5935 23.1104 13.9419 22.9957 13.3919 22.6193C12.8451 22.2477 12.4258 21.776 12.0887 21.2154C11.829 20.7857 11.8016 20.5223 12.4371 20.5853C12.6387 20.6047 12.8645 20.6516 13.158 20.4222C11.5629 19.6402 10.4742 18.5142 10.4129 16.6482C10.9242 16.6224 11.3016 17.0457 11.8322 16.8453C11.2016 16.0844 10.6242 15.3364 10.4871 14.3218C10.3968 13.6562 10.4871 13.0456 10.6613 12.4203C10.8177 11.863 11.0145 11.766 11.4387 12.2362C13.0984 14.0698 15.1645 15.1942 17.5838 15.6741C17.7677 15.7112 17.9532 15.7355 18.137 15.771C18.7532 15.8873 19.0419 15.8292 19.0241 15.0068C18.9919 13.3767 19.7532 12.0746 21.2741 11.3993C22.7548 10.7402 24.216 10.8791 25.4967 11.9502C25.8144 12.2152 26.0918 12.2459 26.4499 12.1053C27.0192 11.8807 27.595 11.6772 28.2725 11.4268Z"
                      fill="#FEFEFE"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </FooterWrap>
    </Layout>
  );
};

export default MainLayout;