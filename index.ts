// Определите интерфейс для пользователя
interface User {
    id: number;
    name: string;
    email: string;
}

// Определите интерфейс для активности пользователя
interface Activity {
    userId: number;
    activity: string;
    timestamp: Date;
}
  
// Реализуйте функцию fetchData используя Generic. Функция должна возвращать Promise.
async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json() as Promise<T>;
  }
  

  // Используйте Utility Types для создания Partial и Readonly версий User и Activity
type PartialUser = Partial<User>;
type ReadonlyActivity = Readonly<User>;


//Типизируйте функцию. userId - число
function getUserActivities(userId: number) {
  return fetchData(`/api/activities/${userId}`);
}


// Используйте ReturnType для создания типа возвращаемого значения функции getUserActivities
type ActivitiesReturnType = ReturnType<typeof getUserActivities>


// Используйте extends в условных типах для создания типа Permissions
type AdminPermissions = { canBanUser: boolean };
type BasicPermissions = { canEditProfile: boolean };
// Заполните тип. Должен выявляться на основне некоторого дженерика и опредять, какой из пермишенов выдавать: Admin или Basic.
type myPermissions<T> = T extends 'admin'  ? AdminPermissions 
  : T extends 'basic' ? BasicPermissions : never;
//---------------------------------------------------------------------------------

  
//---------------------------------------------------------------------------------
///ЧАСТЬ 2.


// Определите Type Alias для Union типа String или Number
type StringOrNumber = string | number


// Реализуйте функцию logMessage, которая принимает StringOrNumber и не возвращает значение (void)
function logMessage(message: StringOrNumber): void {
  console.log(message);
}


// Реализуйте функцию throwError, которая никогда не возвращает управление (never)
function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}


// Реализуйте Type Guard для проверки, является ли значение строкой
function isString(value: StringOrNumber): value is string {
  return typeof value === "string"
}


// Реализуйте функцию assertIsNumber, которая использует asserts для утверждения типа number
function assertIsNumber(value: any): asserts value is number {
  if (typeof value !== "number") {
    throw new Error("Not a number!");
  }
}


// Завершите функцию processValue, используя isString и assertIsNumber
function processValue(value: StringOrNumber) {
  if (isString(value)) {
    return value.toLowerCase();
  }  
  else {
    assertIsNumber(value);
    return value.toFixed(2)
  }
}


//сделайте  Type Guard для определения, является ли значение строкой
function isString2(value: unknown): value is string {
  return typeof value === "string"
}


// создайте asserts function на число.
function assertIsNumber2(value: any): asserts value is number{
  if (typeof value !== "number") {
    throw new Error("Not a number!");
  }
}


// Использование Type Guard и Asserts
function processValue2(value: StringOrNumber) {
  if (isString(value)) {
    console.log(`String value: ${value.toUpperCase()}`);
  } else {
    assertIsNumber(value);
    console.log(`Number value: ${value.toFixed(2)}`);
  }
}


// Разница между Type Guard и Assert Function (для себя)

function calculateDiscount(price: unknown) {
  if (isNumber(price)) {
      return price * 0.9; // Скидка 10%
  } else {
      console.warn("Цена не является числом, скидка не применена");
      return price; // Возвращаем как есть (например, строку)
  }
}

function applyDiscount(price: unknown) {
  assertIsNumber(price); // Если не число — упадёт с ошибкой
  return price * 0.9; // Гарантированно работает с числом
}
//---------------------------------------------------------------------------------


//---------------------------------------------------------------------------------
// Задание 2: Расширенное использование Generics
// Цель: Создать универсальную функцию обработки данных, которая может работать с различными типами данных.

// Определите Generic интерфейс Response с одним параметром типа T. Второй параметр status: number
interface ApiResponse<T> {
  data: T;
  status: number;
}


// Реализуйте и типизируйте функцию, которая возвращает объект Response для переданных данных
function createResponse<T>(data: T, status: number): ApiResponse<T> {
  return {
    data,
    status
  };
}

// Используйте функцию createResponse для создания ответа с массивом чисел
const numericResponse = createResponse<number[]>([1, 2, 3], 200);


interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}


// Используйте функцию createResponse для создания ответа с объектом пользователя (User)
const myUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  age: 30
};

const userResponse = createResponse<User>(myUser, 200);
//---------------------------------------------------------------------------------

    
//---------------------------------------------------------------------------------
// Задание 3: Расширенное использование Generics
// Цель: Разработать несколько функций для обработки и различения типов данных.

// Определите тип данных для описания автомобиля 
type Car = {
  company: string;
  model: string;
  year: number;
};

// Определите тип данных для описания велосипеда
type Bike = {
  company: string;
  type: 'road' | 'mountain';
};

// Создайте Type Guard для проверки, является ли объект автомобилем
function isCar(vehicle: any): vehicle is Car  {
  return (
    typeof vehicle === 'object' &&
    typeof vehicle.company === "string" &&
    typeof vehicle.model === "string" &&
    typeof vehicle.year === "number"
  )
}


// Используйте Type Guard в функции, которая печатает информацию о транспорте. Небольшая подсказка о том, какие параметры в себя может принимать isCar дана ниже.
function printVehicleInfo(vehicle: Car | Bike) {
  if (isCar(vehicle)) {
    console.log(`Car: ${vehicle.company} ${vehicle.model} ${vehicle.year}`);
  } else {
    console.log(`Bike: ${vehicle.company} ${vehicle.type}`);
  }
}
//---------------------------------------------------------------------------------
  


//---------------------------------------------------------------------------------  
// Задание 4: Использование Utility Types для работы с интерфейсами
// Цель: Модифицировать интерфейсы для специфических нужд без изменения оригинальных интерфейсов.

// Определите интерфейс Employee
interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
}

// Используйте Utility Type для создания типа, который делает все свойства Employee опциональными
type PartialEmployee = Partial<Employee>;

// Используйте Utility Type для создания типа, который делает все свойства Employee доступными только для чтения
type ReadonlyEmployee = Readonly<Employee>;

// Создайте функцию, которая принимает PartialEmployee и выводит информацию о сотруднике
function printEmployeeInfo(employee: PartialEmployee): string {
  // Реализуйте логику функции, обрабатывая случай отсутствующих свойств
  return (
    `Инофрмация о сотруднике: 
    id: ${employee.id !== undefined ? employee.id : `неизвестно`}
    name: ${employee.name !== undefined ? employee.name : `неизвестно`}
    department: ${employee.department !== undefined ? employee.department : `неизвестно`}
    email: ${employee.email !== undefined ? employee.email : `неизвестно`}`
  )
}

const employee1: PartialEmployee = {
  id: 1,
  name: 'Иван Иванов',
  // department и email отсутствуют
};

console.log(printEmployeeInfo(employee1));
//---------------------------------------------------------------------------------




//---------------------------------------------------------------------------------  
//Задание 5: Работа с Indexed Access Types и Mapped Types
//Цель: Создать утилиты для работы с объектами и их ключами.

// Определите интерфейс для пользователя
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
  }
  
  // Используйте Indexed Access Types для получения типа поля name из User
  type UserNameType = User['name']
  
  // Создайте Mapped Type, который преобразует все поля интерфейса User в boolean. Можно воспользовать конструкцией Key in keyof 
  type UserFieldsToBoolean = {
    [Key in keyof User]: boolean;
  }
  
  // Реализуйте функцию, которая принимает ключи интерфейса User и возвращает их типы
  function getUserFieldType<K extends keyof User>(key: K): User[K] {
    // Создаем объект с типами полей User
    const typeMap: User = {
      id: 0,
      name: '',
      email: '',
      age: 0
    };
    
    return typeMap[key] as User[K];
  }
  
  // Используйте эту функцию для получения типа поля 'age' и 'name'
  const ageType = getUserFieldType('age');
  const nameType = getUserFieldType('name');

  console.log(typeof ageType, typeof nameType)
  //---------------------------------------------------------------------------------
  

  //---------------------------------------------------------------------------------
// Задание 6: Расширение и ограничение Generics
// Цель: Создать универсальные функции с ограничениями типов.

// Создайте базовый интерфейс для сущностей с идентификатором
interface Identifiable {
  id: number;
}

// Типизируйте функцию, которая принимает массив объектов с ограничением на Generics, где каждый объект должен соответствовать интерфейсу Identifiable. Не забывайте, что find может вернуть undefined
function findById<T extends Identifiable>(items: Array<T>, id: number ): T | undefined {
  return items.find(item => item.id === id);
}

// Используйте эту функцию для поиска пользователя по id в массиве пользователей
const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 }
];
const user = findById(users, 1);
console.log(user);
//---------------------------------------------------------------------------------


//---------------------------------------------------------------------------------
// Задание 7: Работа с обобщённой функцией поиска в массиве
// Цель: Создать функцию, которая может искать элементы в массиве по разным критериям, включая составные типы и условия с использованием нескольких параметров в Generics.
interface User {
  id: number;
  name: string;
  age: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Book {
  isbn: string;
  title: string;
  author: string;
}

// Разберитесь с типизацией функции и поймите как она работает.
// Как можно улучшить функцию findInArray, чтобы она обрабатывала случаи, когда ключ или значение отсутствуют?
// Можно ли использовать эту функцию для поиска по нескольким ключам одновременно? Если да, как бы вы это реализовали?
function findInArray<T>(items: T[], criteria: { [K in keyof T]?: T[K] }): T | undefined {
  if (criteria == null) {
    throw new Error("Критерии поиска не переданы (null/undefined)");
  }

  if (typeof criteria !== "object" || Array.isArray(criteria)) {
    throw new Error("Критерии поиска должны быть объектом");
  }

  const criteriaKeys = Object.keys(criteria);
  if (criteriaKeys.length === 0) {
    throw new Error("Критерии поиска не указаны (пустой объект)");
  }

  for (const key of criteriaKeys) {
    if (criteria[key as keyof T] === undefined) {
      throw new Error(`Значение для ключа '${key}' не указано (undefined)`);
    }
  }

  return items.find(item =>
    criteriaKeys.every(key => 
      item[key as keyof T] === criteria[key as keyof T]
    )
  );
}

// Данные для тестирования функции
const users: User[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 }
];

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 500 }
];

const books: Book[] = [
  { isbn: "12345", title: "The TypeScript Handbook", author: "Someone" },
  { isbn: "67890", title: "Learning TypeScript", author: "Another One" }
];

// 1. Найдите пользователя по имени "Alice".
const foundUser = findInArray(users, {name: "Alice"});
// 2. Найдите продукт с ценой 500.
const foundProduct = findInArray(products, {id: 2, "price": 500});
// 3. Найдите книгу по автору "Another One".
const foundBook = findInArray(books, {author: "Another One"})

console.log(foundUser);
console.log(foundProduct);
console.log(foundBook);


//---------------------------------------------------------------------------------
// Задание 8: Реализация обобщённой функции для сопоставления и преобразования элементов массива
// Цель: Создать функцию mapAndFilter, которая будет принимать массив объектов, функцию для их преобразования и функцию для фильтрации результатов. Функция должна использовать два параметра Generic: один для типа элементов входного массива, а другой для типа элементов выходного массива.

// Описание задачи: Функция mapAndFilter должна выполнить следующие функции:
// Применить функцию преобразования ко всем элементам входного массива.
// Фильтровать преобразованные элементы с помощью предоставленной функции фильтрации.
// Возвращать новый массив с результатами, которые прошли фильтрацию.
interface Person {
  name: string;
  age: number;
}

interface Adult {
  fullName: string;
  age: number;
}

// Напишите функцию mapAndFilter здесь. Используйте два параметра Generic: T для типа входных данных и U для типа выходных данных.
function mapAndFilter<T, U>(
  items: Array<T>,
  transform: (item: T) => U,
  filter: (transformedItem: U) => boolean
): Array<U> {
  const transformedItems = items.map(transform);
  
  const filteredItems = transformedItems.filter(filter);
  
  return filteredItems;
}

// Пример данных
const people: Person[] = [
  { name: "Alice", age: 24 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 32 }
];

// Пример использования функции mapAndFilter
const adults: Adult[] = mapAndFilter(
  people,
  (person) => ({ fullName: person.name, age: person.age }),
  (adult) => adult.age >= 18
);

// Выведите результаты для проверки
console.log(adults);

//Вопросы после реализации:
// Как изменится функция, если необходимо добавить возможность изменения критерия сортировки? 
// Можно добавить еще один входной параметр, в который будет передаваться функция сортировки, и применять ее к результату функции перед выходом
// Могут ли типы T и U быть полностью разными или должны иметь общие характеристики? Да, они могут быть разными, только с ограничением, что функция transform должна смочь конвертировать T в U


//---------------------------------------------------------------------------------



//---------------------------------------------------------------------------------
// Задание 9:

type DeepReadonly<T> = T extends Function 
  ? T 
  : T extends Array<infer U> 
    ? ReadonlyArray<DeepReadonly<U>> 
    : T extends object 
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> } 
      : T;

//Прмер:
type User = {
  name: string;
  address: {
    city: string;
    street: string;
  };
  hobbies: string[];
};

type DeepReadonlyUser = DeepReadonly<User>;

const readonlyUser: DeepReadonlyUser = {
  name: "Alice",
  address: {
    city: "Wonderland",
    street: "Main"
  },
  hobbies: ["reading", "coding"],
  sayHello: () => console.log("Hi!")
};

readonlyUser.name = "James";  // Ошибка, потому что только readonly



//---------------------------------------------------------------------------------
//Задание 10:

// Написать тип для преобразования методов класса в Promise-версии
type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer Return
    ? (...args: Args) => Promise<Return>
    : T[K];
};

class UserService {
  getUser(id: number): User { return {} as User; }
  saveUser(user: User): void {}
  version: string = "1.0";
}

type AsyncUserService = Promisify<UserService>;
/* 
Результат:
{
  getUser(id: number): Promise<User>;
  saveUser(user: User): Promise<void>;
  version: string;
}
*/


//---------------------------------------------------------------------------------
//Задание 11:

// Условие задачи
// Реализуйте тип Awaited<T>, который:
// Раскрывает тип значения, обёрнутого в Promise (аналогично встроенному Awaited в TypeScript 4.5+).
// Обрабатывает вложенные Promise (например, Promise<Promise<string>> → string).

// Не раскрывает другие типы (например, Array<Promise<string>> остаётся Array<Promise<string>>).
// Подсказки: почитайте про infer, extends и conditional types

type AwaitedMy<T> = T extends Promise<infer U> 
  ? AwaitedMy<U>  // Рекурсивно раскрываем вложенные Promise
  : T;           // Если не Promise, возвращаем как есть

// Пример использования:
type Example1 = AwaitedMy<Promise<string>>;         // string
type Example2 = AwaitedMy<Promise<Promise<number>>>; // number
type Example3 = AwaitedMy<boolean>;                // boolean (не Promise)
type Example4 = AwaitedMy<Array<Promise<string>>>; // Array<Promise<string>> (без изменений)

const test1: Awaited<Promise<string>> = "text";
const test2: Awaited<Promise<string>> = 123; // ошибка типов