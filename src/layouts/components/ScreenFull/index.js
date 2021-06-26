import React, { useState } from 'react';
import {
    FullscreenOutlined,
    FullscreenExitOutlined
  } from '@ant-design/icons';
import screenfull from 'screenfull'
import { message, Tooltip } from 'antd';

const ScreenFull = () => {
    const [isFull, setIsFull] = useState(false)
    const fullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle()
            setIsFull(!screenfull.isFullscreen) 
        } else {
            message.error('"you browser can not work"')
        }
    }

    return (
        <Tooltip title={isFull ? '退出全屏' : '全屏'}>
            <div className='header-right__item'>
                {
                    isFull ? <FullscreenExitOutlined onClick={fullScreen} /> : <FullscreenOutlined onClick={fullScreen} />
                }
            </div>
        </Tooltip>
    );
}
 
export default ScreenFull;