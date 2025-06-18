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
  