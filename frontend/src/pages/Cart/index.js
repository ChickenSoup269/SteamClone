import classNames from 'classnames/bind'
import styles from './Cart.module.scss'

const cx = classNames.bind(styles)

function Cart() {
    return <div className={cx('wrapper')}>Cart</div>
}
export default Cart
