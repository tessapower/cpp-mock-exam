# Module 9: Templates

## Overview

**What are Templates?**

Templates are C++'s mechanism for **generic programming** - writing code that works with any type. Instead of writing `max` for ints, `max` for doubles, `max` for strings separately, you write one template that works for all.

**The Core Idea:**

```cpp
// Without templates - repetitive!
int max(int a, int b) { return (a > b) ? a : b; }
double max(double a, double b) { return (a > b) ? a : b; }
std::string max(std::string a, std::string b) { return (a > b) ? a : b; }

// With templates - one function for all types!
template<typename T>
T max(T a, T b) { return (a > b) ? a : b; }
```

**How Templates Work:**

Templates are a **compile-time** mechanism. The compiler generates actual code when you use a template:

```
You write:    template<typename T> T max(T a, T b) { ... }
You use:      max(5, 10)
Compiler generates: int max(int a, int b) { ... }

You use:      max(3.14, 2.71)
Compiler generates: double max(double a, double b) { ... }
```

This is called **template instantiation** - the compiler creates (instantiates) a concrete version for each type you use.

**Key Concepts:**

1. **Type Parameters**: `typename T` or `class T` (both mean the same)
2. **Template Instantiation**: Compiler generates code for specific types
3. **Type Deduction**: Compiler figures out T from arguments
4. **Specialization**: Provide custom implementation for specific types
5. **SFINAE**: "Substitution Failure Is Not An Error" - advanced technique

**The Template Family:**

- **Function Templates**: Generic functions
- **Class Templates**: Generic classes (like std::vector<T>)
- **Variable Templates**: Generic variables (C++14)
- **Alias Templates**: Generic type aliases (using = )

**Why Templates Matter:**

All STL containers and algorithms are templates!

```cpp
std::vector<int>         // vector is a class template
std::map<string, int>    // map is a class template with 2 parameters
std::find(begin, end, x) // find is a function template
```

**The Power:**

- **Code reuse**: Write once, works for any type
- **Type safety**: Compile-time type checking
- **Performance**: Zero runtime overhead (inline expansion)
- **Flexibility**: Works with user-defined types automatically

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

---

## Understanding Template Instantiation

**What Happens at Compile Time:**

```cpp
template<typename T>
T square(T x) {
    return x * x;
}

int main() {
    int a = square(5);      // Instantiates square<int>
    double b = square(3.14); // Instantiates square<double>
}

// Compiler generates (approximately):
// int square(int x) { return x * x; }
// double square(double x) { return x * x; }
```

**Implicit vs Explicit Instantiation:**

```cpp
template<typename T>
T add(T a, T b) { return a + b; }

// Implicit - compiler deduces T from arguments
auto result1 = add(5, 10);      // T deduced as int
auto result2 = add(3.14, 2.71); // T deduced as double

// Explicit - you specify T
auto result3 = add<double>(5, 10);    // T is double, 5 and 10 converted
auto result4 = add<int>(3.14, 2.71);  // T is int, values truncated

// Mixed types require explicit specification or different approach
template<typename T, typename U>
auto add_mixed(T a, U b) -> decltype(a + b) {
    return a + b;
}

auto result5 = add_mixed(5, 3.14);  // Returns double (5.0 + 3.14)
```

**The Two-Phase Compilation:**

Templates are compiled in two phases:

1. **Phase 1** (Template Definition): Check syntax, non-dependent code
2. **Phase 2** (Instantiation): Check type-specific code

```cpp
template<typename T>
void process(T value) {
    int x = 42;          // Phase 1: Always checked
    value.foo();         // Phase 2: Only checked when instantiated
    unknown_function();  // Phase 1: Error - doesn't exist
}

// This compiles even though value.foo() might not exist!
// Error only happens when you try to use it:
// process(42);  // Error: int doesn't have .foo()
```

## Template Type Deduction Rules

**Basic Deduction:**

```cpp
template<typename T>
void func(T param) { }

int x = 42;
const int cx = x;
const int& rx = x;

func(x);   // T = int, param type = int
func(cx);  // T = int, param type = int (const dropped!)
func(rx);  // T = int, param type = int (reference + const dropped!)
```

**Reference Deduction:**

```cpp
template<typename T>
void func_ref(T& param) { }

func_ref(x);   // T = int, param type = int&
func_ref(cx);  // T = const int, param type = const int&
func_ref(rx);  // T = const int, param type = const int&
```

**Universal References (Forwarding References):**

```cpp
template<typename T>
void func_forward(T&& param) { }  // && with template T = forwarding reference

int x = 42;
const int cx = x;

func_forward(x);   // T = int&, param = int&
func_forward(cx);  // T = const int&, param = const int&
func_forward(42);  // T = int, param = int&&
```

## Decision Guide: When to Use Templates

### Decision Tree

```
Do you need to work with multiple types?
├─ YES → Continue
└─ NO → Use regular function/class

Is the behavior identical for all types?
├─ YES → Use template
└─ NO → Use function overloading or inheritance

Do you need compile-time type safety?
├─ YES → Use template (not void* or runtime polymorphism)
└─ NO → Consider std::any or void*

Do you need zero runtime overhead?
├─ YES → Use template (inline expansion)
└─ NO → Virtual functions acceptable

Is code size a concern?
├─ YES → Careful with templates (code bloat from instantiations)
└─ NO → Templates are fine
```

### Real-World Scenarios

#### Scenario 1: Generic Container Operations

```cpp
#include <vector>
#include <list>
#include <iostream>

// Works with any container that supports iterators
template<typename Container>
void print_container(const Container& c) {
    for (const auto& item : c) {
        std::cout << item << " ";
    }
    std::cout << '\n';
}

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    std::list<double> lst = {1.1, 2.2, 3.3};
    
    print_container(vec);  // Works with vector
    print_container(lst);  // Works with list
    
    return 0;
}
```

#### Scenario 2: Type-Safe Generic Data Structure

```cpp
template<typename T>
class Stack {
    std::vector<T> data;
public:
    void push(const T& value) {
        data.push_back(value);
    }
    
    T pop() {
        if (data.empty()) throw std::runtime_error("Empty stack");
        T value = data.back();
        data.pop_back();
        return value;
    }
    
    bool empty() const { return data.empty(); }
    size_t size() const { return data.size(); }
};

int main() {
    Stack<int> int_stack;
    int_stack.push(42);
    int_stack.push(100);
    
    Stack<std::string> str_stack;
    str_stack.push("hello");
    str_stack.push("world");
    
    // Type-safe! Can't mix types
    // int_stack.push("error");  // Compile error!
    
    return 0;
}
```

#### Scenario 3: Algorithm with Custom Comparison

```cpp
template<typename T, typename Compare>
const T& better_max(const T& a, const T& b, Compare comp) {
    return comp(a, b) ? b : a;
}

int main() {
    // Natural ordering
    auto m1 = better_max(5, 10, std::less<int>());
    
    // Reverse ordering
    auto m2 = better_max(5, 10, std::greater<int>());
    
    // Custom comparison
    std::string s1 = "short";
    std::string s2 = "longer string";
    auto m3 = better_max(s1, s2, 
        [](const std::string& a, const std::string& b) {
            return a.length() < b.length();
        });
    
    return 0;
}
```

#### Scenario 4: SFINAE - Enable Function for Certain Types

```cpp
#include <type_traits>
#include <iostream>

// Only enabled for integral types
template<typename T>
typename std::enable_if<std::is_integral<T>::value, T>::type
process(T value) {
    std::cout << "Processing integer: " << value << '\n';
    return value * 2;
}

// Only enabled for floating point types
template<typename T>
typename std::enable_if<std::is_floating_point<T>::value, T>::type
process(T value) {
    std::cout << "Processing float: " << value << '\n';
    return value / 2.0;
}

int main() {
    process(42);     // Calls integer version
    process(3.14);   // Calls floating point version
    // process("hi");  // Compile error - no matching function
    
    return 0;
}
```

### Common Mistakes and Solutions

#### Mistake 1: Including Template Implementation in .cpp

```cpp
// ❌ WRONG - template.h
template<typename T>
class MyClass {
    void method();
};

// template.cpp
template<typename T>
void MyClass<T>::method() { /* ... */ }
// Won't link! Template implementation must be visible to compiler

// ✅ CORRECT - template.h
template<typename T>
class MyClass {
    void method();
};

template<typename T>
void MyClass<T>::method() { /* ... */ }
// Keep implementation in header
```

#### Mistake 2: Forgetting typename for Dependent Types

```cpp
template<typename T>
class Container {
    // ❌ WRONG - compiler doesn't know if value_type is a type
    T::value_type x;
    
    // ✅ CORRECT - tell compiler it's a type
    typename T::value_type x;
};
```

#### Mistake 3: Template Instantiation Bloat

```cpp
// ❌ BLOAT - instantiates for every type
template<typename T>
void process(const std::vector<T>& vec) {
    // Lots of code...
    for (const auto& item : vec) {
        // Complex processing
    }
}

// ✅ BETTER - common code in non-template function
void process_impl(const void* data, size_t size, size_t element_size) {
    // Common logic (instantiated once)
}

template<typename T>
void process(const std::vector<T>& vec) {
    // Type-specific wrapper (small, instantiated per type)
    process_impl(vec.data(), vec.size(), sizeof(T));
}
```

#### Mistake 4: Not Understanding Type Deduction

```cpp
template<typename T>
void func(T param) { }

const int x = 42;
func(x);  // ❌ Surprised! T = int, not const int

// If you need to preserve const:
template<typename T>
void func_preserve(const T& param) { }

func_preserve(x);  // T = int, param = const int&
```

### Template Specialization

**Full Specialization:**

```cpp
// Primary template
template<typename T>
class Storage {
public:
    void info() { std::cout << "Generic storage\n"; }
};

// Full specialization for bool
template<>
class Storage<bool> {
public:
    void info() { std::cout << "Optimized bool storage\n"; }
};

Storage<int> s1;
s1.info();   // "Generic storage"

Storage<bool> s2;
s2.info();   // "Optimized bool storage"
```

**Partial Specialization (Classes Only):**

```cpp
// Primary template
template<typename T, typename U>
class Pair {
public:
    void info() { std::cout << "Two different types\n"; }
};

// Partial specialization - both types the same
template<typename T>
class Pair<T, T> {
public:
    void info() { std::cout << "Two same types\n"; }
};

// Partial specialization - pointers
template<typename T, typename U>
class Pair<T*, U*> {
public:
    void info() { std::cout << "Two pointers\n"; }
};

Pair<int, double> p1;
p1.info();  // "Two different types"

Pair<int, int> p2;
p2.info();  // "Two same types"

Pair<int*, double*> p3;
p3.info();  // "Two pointers"
```

### Variadic Templates (C++11)

**Parameter Packs:**

```cpp
#include <iostream>

// Base case - no arguments
void print() {
    std::cout << '\n';
}

// Recursive case - at least one argument
template<typename T, typename... Args>
void print(T first, Args... rest) {
    std::cout << first << " ";
    print(rest...);  // Recursive call with remaining arguments
}

int main() {
    print(1, 2, 3, 4, 5);
    print("Hello", "World", 42, 3.14);
    
    return 0;
}
```

**Fold Expressions (C++17):**

```cpp
// Sum all arguments
template<typename... Args>
auto sum(Args... args) {
    return (args + ...);  // Fold expression
}

// All true?
template<typename... Args>
bool all(Args... args) {
    return (args && ...);
}

int main() {
    std::cout << sum(1, 2, 3, 4, 5) << '\n';  // 15
    std::cout << all(true, true, false) << '\n';  // false
    
    return 0;
}
```

### Performance Implications

**Templates vs Virtual Functions:**

```cpp
// Virtual function - runtime polymorphism
class Base {
public:
    virtual void process() = 0;
};

void operate(Base& obj) {
    obj.process();  // Virtual call - ~5-10ns overhead
}

// Template - compile-time polymorphism
template<typename T>
void operate(T& obj) {
    obj.process();  // Direct call - can be inlined (0 overhead)
}
```

**Code Bloat:**

```cpp
template<typename T>
void big_function(T value) {
    // 1000 lines of code...
}

// Using with 10 different types = 10,000 lines of generated code!
big_function<int>(42);
big_function<double>(3.14);
big_function<std::string>("hello");
// ... 7 more types ...

// Mitigation: Move common code to non-template function
```

### Best Practices

**1. Use `typename` for Dependent Types:**

```cpp
template<typename T>
void func() {
    typename T::value_type x;  // Required for dependent names
}
```

**2. Prefer `using` to `typedef` for Template Aliases:**

```cpp
// ❌ Old way - can't do this
// typedef std::vector<T> Vec;  // Error: T unknown

// ✅ New way - template alias
template<typename T>
using Vec = std::vector<T>;

Vec<int> v;  // Same as std::vector<int>
```

**3. Use `decltype` for Return Type Deduction:**

```cpp
template<typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}

// C++14: Even simpler
template<typename T, typename U>
auto add(T a, U b) {
    return a + b;
}
```

**4. Consider Concepts (C++20):**

```cpp
#include <concepts>

// Require T to be an integral type
template<std::integral T>
T double_value(T x) {
    return x * 2;
}

double_value(42);     // OK
// double_value(3.14);  // Error: not integral
```

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

