// interface 描述对象的形状和结构，可以给数据增添类型 而且方便复用
// type的方式 通过别名来重新定义类型

// interface 可以被类实现 和继承 ， type没有功能
// type 可以使用联合类型  interface 不能使用联合类型

// 1）如何用接口描述对象类型 , 如果有联合类型 就使用type
interface IObj {
  name: string;
  age: number;
}
// type IObj = {name:string,age:number} | string;
const getObj = (obj: IObj) => {};
getObj({ name: "zf", age: 12 });

// 2) 描述函数类型
interface ISum {
  (a: string, b: string): string;
}
// type ISum = (a:string,b:string)=>string
const sum: ISum = (a, b) => {
  return a + b;
};

// 3) 我希望写个计数器的例子  每次调用函数就累加1

interface ICount {
  // 接口中的混合类型
  (): number;
  count: number;
}

const fn: ICount = (() => {
  // 函数返回函数 我一般要标识函数的返回类型
  return ++fn.count;
}) as ICount;
fn.count = 0;

// interface IEffect {
//     ():void,
//     id:number
// }
// function effect(fn:Function){
//     const reactiveEffect = createReactiveEffect(fn);
//     return reactiveEffect
// }
// function createReactiveEffect(fn:Function):IEffect{
//     const effect:IEffect = function reactiveEffect(){

//     }
//     effect.id = 1;
//     return effect
// }

// 4) 接口的特性
// interface IVegetables {
//     color:string,
//     taste:string
// }
// 1 直接断言，断言后可以直接使用 （要保证接口中限制的数据必须要有）
// const tomato:IVegetables = {
//     color:'red',
//     taste:'sweet',
//     size:'big'
// } as IVegetables
// 可能我的代码里 用不到这个size ， 还要手动删掉?

// 2)  接口的合并  接口同名会合并，会改变原有的接口
// interface IVegetables {
//     size:string
// }
// const tomato:IVegetables = {
//     color:'red',
//     taste:'sweet',
//     size:'big'
// }

// 3) 我单独写一个tomato接口 继承蔬菜接口
// interface ITomato extends IVegetables{ // 接口的继承 ts里面的
//     size:string
// }
// const tomato:ITomato = {
//     color:'red',
//     taste:'sweet',
//     size:'big'
// }

// 4) 可选属性 可以通过? 来实现
interface IVegetables {
  color: string;
  taste: string;
  [key: string]: any; // 任意接口 可多填
  // size?:string // 函数的参数
  // id?:number
}
const tomato: IVegetables = {
  color: "red",
  taste: "sweet",
};
// 5) 可索引接口
interface ILikeArray {
  [key: number]: any;
}
let arr: ILikeArray = [1, 2, 3];
let arr1: ILikeArray = { 1: 1, 2: 2 };

// 把一个对象赋值给一个接口，要满足接口中的所有属性
// 如果多出来的属性 可以采用 断言 、 可选、 任意接口

// 接口中的类型 可以通过类型别名的方式拿出来 ， 但是只能用[]
// 嵌套的情况
// type MyType = {key:string,value:string}
// interface XXX {
//     n:MyType[]
// }
// interface IArr {
//     arr:MyType[],
//     a:XXX
// }
// type My = IArr['a']['n']

// 6) 接口实现 接口可以被类来实现 , 接口中的方法都是抽象（没有具体实现）的
interface ISpeakable {
  name: string;
  // 用接口来形容类的时候  void 表示不关心返回值
  speak(): void; // 描述当前实例上的方法，或者原型的方法
}
interface IChineseSpeakable {
  speakChinese(): void;
}
class Speak implements ISpeakable, IChineseSpeakable {
  // 剋本身需要实现接口中的方法
  speakChinese(): void {
    throw new Error("Method not implemented.");
  }
  name!: string;
  speak(): string {
    // 此方法是原型方法
    return "xxx";
  }
}
let s = new Speak();

// 7.抽象类 不能被new, 可以被继承
abstract class Animal {
  // 只有类被标记成abstract 属性在可以描述成abstract的
  abstract name: string; // 没有具体实现，需要子类实现
  eat() {
    console.log("eat");
  }
  abstract drink(): void;
}
class Cat extends Animal {
  drink(): void {
    console.log("Method not implemented");
  }
  name: string = "a";
}

// abstract（可以放置具体的实现） interface (只能放一些抽象的属性和方法 不能有具体实现)

export {};
