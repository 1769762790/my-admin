import React, { useEffect, useState } from 'react';
import bodymovin from 'bodymovin'
import './index.less'

const LoginLogin = () => {
    const [anim, setAnim] = useState(null)
    useEffect(() => {
        const animData = {
            wrapper: document.querySelector('#animationWindow'),
            animType: 'svg',
            loop: true,
            prerender: true,
            autoplay: true,
            animationData:require('./data.json')
        }
        setAnim(bodymovin.loadAnimation(animData))
        return () => {
            setAnim(null)
        }
    }, [])
    return (
        <div style={{width: '100%', height: '100%', background:'#def3f4'}}>
            <div className='login-bg'>
                <div>
                    <h3>加载中...</h3>
                    <div id='animationWindow' style={{width: '100%',height:'100%'}}></div>
                </div>
            </div>
        </div>
    );
}
 
export default LoginLogin;