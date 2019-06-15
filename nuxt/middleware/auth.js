export default function ({ store, redirect }) {
    if (!store.state.auth.userName) {
        return redirect('/')
    }
}