import Loadable from 'react-loadable';
import PageLoading from '../components/PageLoading'
//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader,loading = PageLoading)=>{
    return Loadable({
        loader,
        loading
    });
}