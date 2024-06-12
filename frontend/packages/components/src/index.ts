export * from './components';


interface IFoo {
    bar(): string;
}

const foo : IFoo = {
    bar() {
        this.foo();
        return 'sdfdsf';
    },
} as IFoo;

export default foo;