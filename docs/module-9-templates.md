# Module 9: Templates

## Overview

Generic programming with function templates, class templates, and advanced template features.

📖 [cppreference: Templates](https://en.cppreference.com/w/cpp/language/templates)

---

## Function Templates

### Basic Function Template

```cpp
#include <iostream>

// Template declaration
template<typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    // Implicit instantiation (type deduction)
    std::cout << maximum(10, 20) << '\n';        // int version
    std::cout << maximum(3.14, 2.71) << '\n';    // double version
    
    // Explicit instantiation
    std::cout << maximum<int>(10, 20) << '\n';
    std::cout << maximum<double>(10, 20) << '\n';  // 20.0
    
    return 0;
}
```

📖 [cppreference: Function template](https://en.cppreference.com/w/cpp/language/function_template)

### Multiple Template Parameters

```cpp
#include <iostream>

template<typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}

// C++14: return type deduction
template<typename T, typename U>
auto multiply(T a, U b) {
    return a * b;
}

int main() {
    std::cout << add(5, 3.14) << '\n';        // 8.14
    std::cout << multiply(2, 3.5) << '\n';    // 7.0
    
    return 0;
}
```

---

## Class Templates

### Basic Class Template

```cpp
#include <iostream>

template<typename T>
class Container {
private:
    T value;
public:
    Container(T v) : value(v) {}
    T getValue() const { return value; }
    void setValue(T v) { value = v; }
};

int main() {
    Container<int> intContainer(42);
    std::cout << intContainer.getValue() << '\n';  // 42
    
    Container<std::string> strContainer("Hello");
    std::cout << strContainer.getValue() << '\n';  // "Hello"
    
    // C++17: Class Template Argument Deduction (CTAD)
    Container ctad(3.14);  // Deduced as Container<double>
    
    return 0;
}
```

📖 [cppreference: Class template](https://en.cppreference.com/w/cpp/language/class_template)

### Template with Multiple Parameters

```cpp
#include <iostream>

template<typename K, typename V>
class Pair {
private:
    K key;
    V value;
public:
    Pair(K k, V v) : key(k), value(v) {}
    K getKey() const { return key; }
    V getValue() const { return value; }
};

int main() {
    Pair<std::string, int> pair("age", 25);
    std::cout << pair.getKey() << ": " << pair.getValue() << '\n';
    
    return 0;
}
```

---

## Non-Type Template Parameters

```cpp
#include <iostream>
#include <array>

// Template with non-type parameter
template<typename T, int Size>
class FixedArray {
private:
    T data[Size];
public:
    T& operator[](int index) { return data[index]; }
    constexpr int size() const { return Size; }
};

int main() {
    FixedArray<int, 5> arr;
    arr[0] = 100;
    std::cout << "Size: " << arr.size() << '\n';  // 5
    
    // Non-type parameters must be compile-time constants
    constexpr int N = 10;
    FixedArray<double, N> arr2;
    
    return 0;
}
```

📖 [cppreference: Non-type template parameters](https://en.cppreference.com/w/cpp/language/template_parameters#Non-type_template_parameter)

---

## Template Specialization

### Full Specialization

```cpp
#include <iostream>
#include <cstring>

// Generic template
template<typename T>
class Printer {
public:
    void print(T value) {
        std::cout << value << '\n';
    }
};

// Full specialization for const char*
template<>
class Printer<const char*> {
public:
    void print(const char* value) {
        std::cout << "String: " << value << " (length: " 
                  << std::strlen(value) << ")\n";
    }
};

int main() {
    Printer<int> intPrinter;
    intPrinter.print(42);  // 42
    
    Printer<const char*> strPrinter;
    strPrinter.print("Hello");  // String: Hello (length: 5)
    
    return 0;
}
```

📖 [cppreference: Template specialization](https://en.cppreference.com/w/cpp/language/template_specialization)

### Partial Specialization (Classes Only)

```cpp
#include <iostream>

// Primary template
template<typename T, typename U>
class Pair {
public:
    void print() { std::cout << "Generic pair\n"; }
};

// Partial specialization: both types are same
template<typename T>
class Pair<T, T> {
public:
    void print() { std::cout << "Same-type pair\n"; }
};

// Partial specialization: second type is pointer
template<typename T, typename U>
class Pair<T, U*> {
public:
    void print() { std::cout << "Second is pointer\n"; }
};

int main() {
    Pair<int, double> p1;
    p1.print();  // "Generic pair"
    
    Pair<int, int> p2;
    p2.print();  // "Same-type pair"
    
    Pair<int, double*> p3;
    p3.print();  // "Second is pointer"
    
    return 0;
}
```

---

## Variadic Templates (C++11)

```cpp
#include <iostream>

// Base case
void print() {
    std::cout << '\n';
}

// Recursive case
template<typename T, typename... Args>
void print(T first, Args... rest) {
    std::cout << first << ' ';
    print(rest...);  // Recursive call
}

// Count arguments
template<typename... Args>
constexpr int count(Args... args) {
    return sizeof...(args);
}

int main() {
    print(1, 2.5, "hello", 'c');  // 1 2.5 hello c
    
    std::cout << "Count: " << count(1, 2, 3, 4, 5) << '\n';  // 5
    
    return 0;
}
```

📖 [cppreference: Parameter pack](https://en.cppreference.com/w/cpp/language/parameter_pack)

### Fold Expressions (C++17)

```cpp
#include <iostream>

// Sum using fold expression
template<typename... Args>
auto sum(Args... args) {
    return (args + ...);  // Unary right fold
}

// Print with fold
template<typename... Args>
void printAll(Args... args) {
    ((std::cout << args << ' '), ...);  // Unary left fold
    std::cout << '\n';
}

int main() {
    std::cout << sum(1, 2, 3, 4, 5) << '\n';  // 15
    printAll("Hello", 42, 3.14, "World");     // Hello 42 3.14 World
    
    return 0;
}
```

📖 [cppreference: Fold expression](https://en.cppreference.com/w/cpp/language/fold)

---

## Template Template Parameters

```cpp
#include <vector>
#include <list>
#include <iostream>

// Template template parameter
template<typename T, template<typename, typename> class Container>
class Stack {
private:
    Container<T, std::allocator<T>> data;
public:
    void push(const T& value) { data.push_back(value); }
    T pop() {
        T val = data.back();
        data.pop_back();
        return val;
    }
    bool empty() const { return data.empty(); }
};

int main() {
    Stack<int, std::vector> vecStack;
    vecStack.push(1);
    vecStack.push(2);
    
    Stack<int, std::list> listStack;
    listStack.push(10);
    listStack.push(20);
    
    return 0;
}
```

📖 [cppreference: Template template parameters](https://en.cppreference.com/w/cpp/language/template_parameters#Template_template_parameter)

---

## SFINAE and Enable If

```cpp
#include <iostream>
#include <type_traits>

// Enable if T is integral
template<typename T>
typename std::enable_if<std::is_integral<T>::value, T>::type
double_value(T value) {
    return value * 2;
}

// Enable if T is floating point
template<typename T>
typename std::enable_if<std::is_floating_point<T>::value, T>::type
double_value(T value) {
    return value * 2.0;
}

// C++17: if constexpr
template<typename T>
T triple(T value) {
    if constexpr (std::is_integral<T>::value) {
        return value * 3;
    } else {
        return value * 3.0;
    }
}

int main() {
    std::cout << double_value(5) << '\n';      // 10 (int)
    std::cout << double_value(2.5) << '\n';    // 5.0 (double)
    
    std::cout << triple(4) << '\n';            // 12
    std::cout << triple(1.5) << '\n';          // 4.5
    
    return 0;
}
```

📖 [cppreference: SFINAE](https://en.cppreference.com/w/cpp/language/sfinae)

---

## Concepts (C++20)

```cpp
#include <iostream>
#include <concepts>

// Define a concept
template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

// Use concept as constraint
template<Numeric T>
T add(T a, T b) {
    return a + b;
}

// Concept with requires clause
template<typename T>
requires std::is_arithmetic_v<T>
T multiply(T a, T b) {
    return a * b;
}

int main() {
    std::cout << add(5, 3) << '\n';        // OK: int is numeric
    std::cout << add(2.5, 1.5) << '\n';    // OK: double is numeric
    // std::cout << add("a", "b") << '\n'; // ERROR: string not numeric
    
    return 0;
}
```

📖 [cppreference: Constraints and concepts](https://en.cppreference.com/w/cpp/language/constraints)

---

## Template Aliases (C++11)

```cpp
#include <vector>
#include <map>
#include <string>

// Type alias
template<typename T>
using Vec = std::vector<T>;

template<typename K, typename V>
using Dict = std::map<K, V>;

// Simplify complex types
template<typename T>
using StringDict = std::map<std::string, T>;

int main() {
    Vec<int> numbers = {1, 2, 3};
    Dict<std::string, int> ages = {{"Alice", 30}};
    StringDict<double> prices = {{"apple", 1.99}};
    
    return 0;
}
```

📖 [cppreference: Type alias](https://en.cppreference.com/w/cpp/language/type_alias)

---

## Key Concepts

### typename vs class

```cpp
// Mostly interchangeable in template parameters
template<typename T>  // Preferred
template<class T>     // Equivalent

// typename required for dependent types
template<typename T>
void foo() {
    typename T::value_type x;  // Must use typename!
    // T::value_type x;        // ERROR without typename
}
```

### Template Instantiation

```cpp
// Implicit instantiation
template<typename T> T max(T a, T b) { return a > b ? a : b; }
int x = max(1, 2);  // Instantiates max<int>

// Explicit instantiation
template int max<int>(int, int);  // Force instantiation

// Explicit specialization
template<> int max<int>(int a, int b) { return a > b ? a : b; }
```

---

## Key Takeaways

✅ **Template instantiation** happens at **compile time**  
✅ **typename** required for dependent type names  
✅ **Specialization** allows type-specific implementations  
✅ **Variadic templates** accept any number of arguments  
✅ **SFINAE** enables conditional template compilation  
✅ **Concepts (C++20)** provide named constraints  
✅ **CTAD (C++17)** deduces template arguments for classes

---

[← Previous: Module 8](./module-8-advanced-io.md) | [Back to Index](./README.md)

