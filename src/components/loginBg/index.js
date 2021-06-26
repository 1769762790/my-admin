import React from 'react';
import Particles from 'react-particles-js';
const config = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: false
            }
        },
        "size": {
            "value": 10,
            "random": true,
            "anim": {
                "speed": 4,
                "size_min": 0.3,
            }
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "random": true,
            "speed": 1,
            "direction": "top",
            "out_mode": "out"
        }
    },
    interactivity: {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "bubble"
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            }
        },
        "modes": {
            "bubble": {
                "distance": 250,
                "duration": 2,
                "size": 0,
                "opacity": 0
            },
            "repulse": {
                "distance": 400,
                "duration": 4
            }
        }
    }
}
const LoginBg = () => {
    return (
        <Particles
            className='login-particle'
            params={config}
            style={{
            width: '100%',
            height: '100%'
            }}
        />
    );
}
 
export default LoginBg;