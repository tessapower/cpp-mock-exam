# Module 9: Templates

## Overview

**What are Templates?**

Templates are C++'s mechanism for **generic programming** - writing code
that works with any type. Instead of writing `max` for ints, `max` for
doubles, `max` for strings separately, you write one template that works for all.

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

Templates are a **compile-time** mechanism. The compiler generates actual code
when you use a template:

```markdown
You write:    template<typename T> T max(T a, T b) { ... }
You use:      max(5, 10)
Compiler generates: int max(int a, int b) { ... }

You use:      max(3.14, 2.71)
Compiler generates: double max(double a, double b) { ... }
```

This is called **template instantiation** - the compiler creates
(instantiates) a concrete version for each type you use.

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

Function templates allow you to write a single function that works with multiple types. Think of them as blueprints or recipes that the compiler uses to generate actual functions.

### Basic Function Template

**The Problem:**

Without templates, you'd have to write separate functions for each type:

```cpp
int maximum(int a, int b) { return (a > b) ? a : b; }
double maximum(double a, double b) { return (a > b) ? a : b; }
std::string maximum(std::string a, std::string b) { return (a > b) ? a : b; }
// ... and so on for every type!
```

This is repetitive, error-prone, and hard to maintain.

**The Template Solution:**

```cpp
#include <iostream>

// Template declaration - T is a placeholder for "any type"
template<typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    // Implicit instantiation (type deduction)
    // The compiler sees maximum(10, 20) and generates maximum<int>
    std::cout << maximum(10, 20) << '\n';        // 20 (int version)
    std::cout << maximum(3.14, 2.71) << '\n';    // 3.14 (double version)
    std::cout << maximum('z', 'a') << '\n';      // z (char version)
    
    // Explicit instantiation - you tell the compiler which type to use
    std::cout << maximum<int>(10, 20) << '\n';      // 20
    std::cout << maximum<double>(10, 20) << '\n';   // 20.0 (converts to double)
    
    // Can even work with strings!
    std::string s1 = "apple", s2 = "banana";
    std::cout << maximum(s1, s2) << '\n';        // banana (lexicographic comparison)
    
    return 0;
}
```

**Understanding `template<typename T>`:**

- `template` - keyword that says "this is a template"
- `typename T` - declares T as a type parameter (you can use `class` instead of `typename`, they're identical)
- `T` can be **any valid type**: int, double, string, vector, your custom classes, etc.

**How the Compiler Processes This:**

1. You write one template
2. When you call `maximum(10, 20)`, compiler sees both arguments are `int`
3. Compiler generates an actual function: `int maximum(int a, int b) { return (a > b) ? a : b; }`
4. This happens at **compile time**, not runtime!

**Important Constraint:**

Both arguments must be the same type when using type deduction:

```cpp
maximum(10, 20);       // ✅ OK - both int
maximum(3.14, 2.71);   // ✅ OK - both double
maximum(10, 3.14);     // ❌ ERROR - int and double don't match!
maximum<double>(10, 3.14); // ✅ OK - explicit type, 10 converts to 10.0
```

📖 [cppreference: Function template](https://en.cppreference.com/w/cpp/language/function_template)

### Multiple Template Parameters

Sometimes you need to work with **different types** in the same function. This is where multiple template parameters come in.

**The Challenge:**

What if you want to add an int and a double? Or multiply different numeric types?

```cpp
// Won't work - T can only be one type!
template<typename T>
T add(T a, T b) { return a + b; }

// add(5, 3.14);  // ERROR - is T int or double?
```

**Solution: Multiple Type Parameters:**

```cpp
#include <iostream>

// Two separate type parameters
template<typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}

// C++14: return type deduction (simpler syntax)
template<typename T, typename U>
auto multiply(T a, U b) {
    return a * b;
}

int main() {
    std::cout << add(5, 3.14) << '\n';        // 8.14 (int + double = double)
    std::cout << multiply(2, 3.5) << '\n';    // 7.0 (int * double = double)
    
    // Works with any combination
    std::cout << add(1.5, 2.5) << '\n';       // 4.0 (double + double)
    std::cout << multiply(3, 4) << '\n';      // 12 (int * int)
    
    return 0;
}
```

**Understanding `auto` and `decltype`:**

- `decltype(a + b)` - asks "what type would `a + b` return?"
- If `a` is int (5) and `b` is double (3.14), then `a + b` is double (8.14)
- `auto` (C++14+) - lets compiler figure out return type automatically

**Why This Works:**

The compiler uses **type promotion rules** - when mixing types, the result is the more precise type:
- int + double → double
- float + double → double
- int + int → int

**A More Practical Example:**

```cpp
#include <iostream>
#include <string>

// Generic print function that works with any two types
template<typename T, typename U>
void print_pair(const T& first, const U& second) {
    std::cout << "First: " << first << ", Second: " << second << '\n';
}

int main() {
    print_pair(42, "Hello");           // int and const char*
    print_pair(3.14, 100);             // double and int
    print_pair("Age", 25);             // const char* and int
    
    std::string name = "Alice";
    print_pair(name, 30);              // string and int
    
    return 0;
}
```

**Key Takeaway:**

- Single template parameter (`typename T`) - all parameters must be same type
- Multiple template parameters (`typename T, typename U`) - each can be different
- Use `auto` return type when you don't know the exact result type

---

## Class Templates

Class templates are similar to function templates, but they define generic
classes. They're the foundation of the entire STL - `std::vector`,
`std::map`, `std::string`, etc. are all class templates!

### Basic Class Template

**Why Class Templates?**

Imagine you need a simple container that holds a single value. Without 
templates:

```cpp
class IntContainer {
    int value;
public:
    IntContainer(int v) : value(v) {}
    int getValue() const { return value; }
};

class DoubleContainer {
    double value;
public:
    DoubleContainer(double v) : value(v) {}
    double getValue() const { return value; }
};

// ... and so on for every type!
```

This is the same problem as with functions - massive code duplication!

**The Template Solution:**

```cpp
#include <iostream>
#include <string>

// Template class - T is a placeholder type
template<typename T>
class Container {
private:
    T value;  // T can be int, string, double, anything!
public:
    // Constructor takes a T
    Container(T v) : value(v) {}
    
    // Methods use T
    T getValue() const { return value; }
    void setValue(T v) { value = v; }
    
    // Can have template methods too
    void print() const {
        std::cout << "Value: " << value << '\n';
    }
};

int main() {
    // Create different containers for different types
    Container<int> intContainer(42);
    std::cout << intContainer.getValue() << '\n';  // 42
    
    Container<std::string> strContainer("Hello");
    std::cout << strContainer.getValue() << '\n';  // "Hello"
    
    Container<double> dblContainer(3.14159);
    dblContainer.print();  // Value: 3.14159
    
    // C++17: Class Template Argument Deduction (CTAD)
    // Compiler deduces T from constructor argument!
    Container ctad1(100);        // T deduced as int
    Container ctad2(3.14);       // T deduced as double
    Container ctad3("World");    // T deduced as const char*
    
    return 0;
}
```

**Understanding the Syntax:**

```cpp
template<typename T>     // 1. Declare template parameter
class Container {        // 2. Define class as normal
private:
    T value;            // 3. Use T wherever you need the generic type
public:
    Container(T v) : value(v) {}  // 4. T in constructor
    T getValue() const { return value; }  // 5. T in return type
};

// Usage:
Container<int> c;       // 6. Specify actual type in angle brackets
```

**How It Works:**

When you write `Container<int> c;`, the compiler generates:

```cpp
// Compiler-generated code (conceptual):
class Container_int {
private:
    int value;
public:
    Container_int(int v) : value(v) {}
    int getValue() const { return value; }
    void setValue(int v) { value = v; }
};
```

**Important Notes:**

- You **must** specify the type: `Container<int>`, not just `Container`
- Exception: C++17 CTAD can deduce from constructor arguments
- Each different type creates a completely separate class

📖 [cppreference: Class template](https://en.cppreference.com/w/cpp/language/class_template)

### Template with Multiple Parameters

Real-world containers often need multiple type parameters. Think of `std::map<string, int>` - it needs both key and value types!

**Building a Generic Pair:**

```cpp
#include <iostream>
#include <string>

// Template with two type parameters
template<typename K, typename V>
class Pair {
private:
    K key;      // First type
    V value;    // Second type
public:
    // Constructor takes both types
    Pair(K k, V v) : key(k), value(v) {}
    
    // Getters for each type
    K getKey() const { return key; }
    V getValue() const { return value; }
    
    // Setters
    void setKey(K k) { key = k; }
    void setValue(V v) { value = v; }
    
    // Print the pair
    void print() const {
        std::cout << key << " : " << value << '\n';
    }
};

int main() {
    // Different type combinations
    Pair<std::string, int> age("Alice", 25);
    age.print();  // Alice : 25
    
    Pair<int, std::string> lookup(404, "Not Found");
    lookup.print();  // 404 : Not Found
    
    Pair<std::string, double> price("Apple", 1.99);
    price.print();  // Apple : 1.99
    
    // Even works with same types
    Pair<int, int> coords(10, 20);
    coords.print();  // 10 : 20
    
    // C++17 CTAD - even with multiple parameters!
    Pair p1("Name", 42);           // Pair<const char*, int>
    Pair p2(100, 200);             // Pair<int, int>
    
    return 0;
}
```

**A More Complex Example - Generic Stack:**

```cpp
#include <vector>
#include <stdexcept>
#include <iostream>

template<typename T>
class Stack {
private:
    std::vector<T> elements;  // Use vector to store elements
    
public:
    // Push element onto stack
    void push(const T& elem) {
        elements.push_back(elem);
    }
    
    // Pop element from stack
    T pop() {
        if (elements.empty()) {
            throw std::runtime_error("Stack is empty!");
        }
        T elem = elements.back();
        elements.pop_back();
        return elem;
    }
    
    // Peek at top element
    const T& top() const {
        if (elements.empty()) {
            throw std::runtime_error("Stack is empty!");
        }
        return elements.back();
    }
    
    // Check if empty
    bool empty() const {
        return elements.empty();
    }
    
    // Get size
    size_t size() const {
        return elements.size();
    }
};

int main() {
    // Stack of integers
    Stack<int> intStack;
    intStack.push(1);
    intStack.push(2);
    intStack.push(3);
    std::cout << "Top: " << intStack.top() << '\n';  // 3
    std::cout << "Pop: " << intStack.pop() << '\n';  // 3
    std::cout << "Size: " << intStack.size() << '\n';  // 2
    
    // Stack of strings
    Stack<std::string> strStack;
    strStack.push("First");
    strStack.push("Second");
    strStack.push("Third");
    std::cout << "Pop: " << strStack.pop() << '\n';  // Third
    
    // Type safety - can't mix types!
    // intStack.push("Hello");  // ❌ Compile error!
    
    return 0;
}
```

**Key Concepts:**

1. **Type Safety**: Templates provide compile-time type checking
2. **Flexibility**: Same code works with any type
3. **Performance**: No runtime overhead (everything resolved at compile time)
4. **Multiple Parameters**: Use as many template parameters as needed
5. **Naming Convention**: Use meaningful names (K for Key, V for Value, T for Type)

---

## Non-Type Template Parameters

So far we've seen **type parameters** (`typename T`), but templates can also
take **value parameters** - actual compile-time constant values!

**What Are Non-Type Parameters?**

Non-type template parameters are **compile-time constants** that become part
of the template:

- Integers (int, size_t, etc.)
- Pointers
- References
- Enums
- nullptr
- Since C++20: floating-point numbers and more

**Why Use Them?**

Non-type parameters let you:

1. Create fixed-size arrays that know their size
2. Configure behavior at compile time
3. Optimize code (compiler knows values)
4. Avoid runtime overhead

### Basic Non-Type Parameter Example

```cpp
#include <iostream>
#include <array>

// Template with both type and non-type parameters
template<typename T, int Size>
class FixedArray {
private:
    T data[Size];  // Size is known at compile time!
public:
    // Constructor - can initialize if needed
    FixedArray() {
        for (int i = 0; i < Size; ++i) {
            data[i] = T();  // Default initialize
        }
    }
    
    // Array access
    T& operator[](int index) { 
        return data[index]; 
    }
    
    const T& operator[](int index) const { 
        return data[index]; 
    }
    
    // Size is a compile-time constant!
    constexpr int size() const { return Size; }
    
    // Can use Size in other constexpr functions
    constexpr bool empty() const { return Size == 0; }
};

int main() {
    // Create array of 5 integers
    FixedArray<int, 5> arr1;
    arr1[0] = 100;
    arr1[1] = 200;
    std::cout << "arr1[0]: " << arr1[0] << '\n';  // 100
    std::cout << "arr1 size: " << arr1.size() << '\n';  // 5
    
    // Create array of 10 doubles
    FixedArray<double, 10> arr2;
    arr2[0] = 3.14;
    std::cout << "arr2 size: " << arr2.size() << '\n';  // 10
    
    // Different sizes create different types!
    // FixedArray<int, 5> and FixedArray<int, 10> are DIFFERENT types
    
    // Size must be compile-time constant
    constexpr int N = 20;
    FixedArray<double, N> arr3;  // ✅ OK - N is constexpr
    
    // int n = 20;
    // FixedArray<double, n> arr4;  // ❌ ERROR - n is not compile-time constant
    
    return 0;
}
```

**How This Differs from std::vector:**

```cpp
// Vector - size determined at runtime
std::vector<int> vec(5);  // Size can be a variable
int n;
std::cin >> n;
std::vector<int> vec2(n);  // ✅ OK - dynamic size

// FixedArray - size must be compile-time constant
FixedArray<int, 5> arr;   // ✅ OK - 5 is constant
// FixedArray<int, n> arr2;  // ❌ ERROR - n is not constant

// But FixedArray has advantages:
// - No heap allocation (faster)
// - Size known at compile time (optimization)
// - Can be used in constexpr contexts
```

### Comparison with std::array

The standard library has `std::array` which works exactly like this!

```cpp
#include <array>
#include <iostream>

int main() {
    // std::array is a template with non-type parameter
    std::array<int, 5> arr = {1, 2, 3, 4, 5};
    
    std::cout << "Size: " << arr.size() << '\n';  // 5
    std::cout << "First: " << arr[0] << '\n';     // 1
    
    // Size is part of the type
    std::array<int, 5> a1;
    std::array<int, 10> a2;
    // a1 = a2;  // ❌ ERROR - different types!
    
    return 0;
}
```

### More Advanced Example: Compile-Time Matrix

```cpp
#include <iostream>

// Matrix with compile-time dimensions
template<typename T, int Rows, int Cols>
class Matrix {
private:
    T data[Rows][Cols];
    
public:
    Matrix() {
        // Initialize to zero
        for (int i = 0; i < Rows; ++i) {
            for (int j = 0; j < Cols; ++j) {
                data[i][j] = T();
            }
        }
    }
    
    // Access element
    T& at(int row, int col) {
        return data[row][col];
    }
    
    const T& at(int row, int col) const {
        return data[row][col];
    }
    
    // Get dimensions
    constexpr int rows() const { return Rows; }
    constexpr int cols() const { return Cols; }
    
    // Print matrix
    void print() const {
        for (int i = 0; i < Rows; ++i) {
            for (int j = 0; j < Cols; ++j) {
                std::cout << data[i][j] << " ";
            }
            std::cout << '\n';
        }
    }
};

int main() {
    // 3x3 integer matrix
    Matrix<int, 3, 3> mat1;
    mat1.at(0, 0) = 1;
    mat1.at(1, 1) = 5;
    mat1.at(2, 2) = 9;
    std::cout << "3x3 Matrix:\n";
    mat1.print();
    
    // 2x4 double matrix
    Matrix<double, 2, 4> mat2;
    mat2.at(0, 0) = 1.1;
    mat2.at(1, 3) = 9.9;
    std::cout << "\n2x4 Matrix:\n";
    mat2.print();
    
    return 0;
}
```

### Valid Non-Type Parameter Types

**What Can Be Non-Type Parameters:**

```cpp
// ✅ Integers
template<int N> class A {};
template<size_t N> class B {};
template<unsigned N> class C {};

// ✅ Pointers
template<int* Ptr> class D {};

// ✅ References
template<int& Ref> class E {};

// ✅ Enumerations
enum Color { RED, GREEN, BLUE };
template<Color C> class F {};

// ✅ nullptr_t
template<std::nullptr_t> class G {};

// C++20: ✅ Floating-point
template<double D> class H {};  // C++20 only

// ❌ Strings (not allowed)
// template<std::string S> class I {};  // ERROR

// ❌ Non-constant values
void func() {
    int n = 5;
    // Matrix<int, n, n> mat;  // ❌ ERROR - n not compile-time constant
}
```

**Practical Use Cases:**

1. **Fixed-size buffers**: `FixedArray<char, 256>`
2. **Compile-time configuration**: `Logger<true>` vs `Logger<false>`
3. **Performance optimization**: Compiler knows exact sizes
4. **Type safety**: Different sizes = different types

📖 [cppreference: Non-type template parameters](https://en.cppreference.com/w/cpp/language/template_parameters#Non-type_template_parameter)

---

## Template Specialization

Template specialization allows you to provide **custom implementations** for
specific types while keeping the generic template for everything else. Think of
it as "special cases" or "exceptions to the rule."

**Why Specialize?**

Sometimes the generic template isn't optimal or does not work correctly for
certain types:

- Performance optimization (e.g., `std::vector<bool>` uses bit-packing)
- Different behavior needed (e.g., comparing C-strings with `strcmp` instead of `>`)
- Type-specific features (e.g., special printing for pointers)

### Full Specialization

Full (or explicit) specialization provides a completely custom implementation
for a **specific type**.

**Basic Example:**

```cpp
#include <iostream>
#include <cstring>

// Primary (generic) template
template<typename T>
class Printer {
public:
    void print(T value) {
        std::cout << value << '\n';
    }
};

// Full specialization for const char*
// Notice: template<> with empty angle brackets
template<>
class Printer<const char*> {
public:
    void print(const char* value) {
        std::cout << "String: \"" << value << "\" (length: " 
                  << std::strlen(value) << ")\n";
    }
};

// Full specialization for bool
template<>
class Printer<bool> {
public:
    void print(bool value) {
        std::cout << (value ? "true" : "false") << '\n';
    }
};

int main() {
    Printer<int> intPrinter;
    intPrinter.print(42);  // Uses generic template: 42
    
    Printer<double> dblPrinter;
    dblPrinter.print(3.14);  // Uses generic template: 3.14
    
    Printer<const char*> strPrinter;
    strPrinter.print("Hello");  // Uses specialized version:
                                // String: "Hello" (length: 5)
    
    Printer<bool> boolPrinter;
    boolPrinter.print(true);   // Uses specialized version: true
    boolPrinter.print(false);  // Uses specialized version: false
    
    return 0;
}
```

**Understanding the Syntax:**

```cpp
// 1. Primary template - works for any type T
template<typename T>
class MyClass {
    // Generic implementation
};

// 2. Full specialization for a specific type
template<>              // Empty template parameter list
class MyClass<int> {    // Specify the exact type
    // Custom implementation for int
};
```

**Real-World Example: Type Traits**

The standard library uses specialization heavily for type traits:

```cpp
#include <iostream>
#include <type_traits>

// Simple version of std::is_pointer
template<typename T>
struct is_pointer {
    static constexpr bool value = false;  // Default: not a pointer
};

// Specialization for pointer types
template<typename T>
struct is_pointer<T*> {
    static constexpr bool value = true;   // Pointers: true
};

int main() {
    std::cout << is_pointer<int>::value << '\n';      // 0 (false)
    std::cout << is_pointer<int*>::value << '\n';     // 1 (true)
    std::cout << is_pointer<double>::value << '\n';   // 0 (false)
    std::cout << is_pointer<char*>::value << '\n';    // 1 (true)
    
    return 0;
}
```

**Function Template Specialization:**

```cpp
#include <iostream>
#include <cstring>

// Primary template
template<typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

// Full specialization for const char*
// Can't use > to compare C-strings!
template<>
const char* maximum<const char*>(const char* a, const char* b) {
    return (std::strcmp(a, b) > 0) ? a : b;
}

int main() {
    std::cout << maximum(10, 20) << '\n';           // 20 (generic)
    std::cout << maximum(3.14, 2.71) << '\n';       // 3.14 (generic)
    std::cout << maximum("apple", "banana") << '\n'; // banana (specialized)
    
    return 0;
}
```

📖 [cppreference: Template specialization](https://en.cppreference.com/w/cpp/language/template_specialization)

### Partial Specialization (Classes Only)

Partial specialization lets you specialize for a **pattern of types** rather 
than a single specific type. **Important:** This only works for class 
templates, not function templates!

**What's the Difference?**

- **Full specialization**: Specialize for one exact type (`MyClass<int>`)
- **Partial specialization**: Specialize for a pattern (`MyClass<T*>` - any pointer type)

**Basic Example:**

```cpp
#include <iostream>

// Primary template - two different types
template<typename T, typename U>
class Pair {
public:
    void info() { 
        std::cout << "Generic pair of two different types\n"; 
    }
};

// Partial specialization: both types are the same
template<typename T>
class Pair<T, T> {
public:
    void info() { 
        std::cout << "Pair of two same types\n"; 
    }
};

// Partial specialization: second type is a pointer
template<typename T, typename U>
class Pair<T, U*> {
public:
    void info() { 
        std::cout << "Second element is a pointer\n"; 
    }
};

// Partial specialization: both are pointers
template<typename T, typename U>
class Pair<T*, U*> {
public:
    void info() { 
        std::cout << "Both elements are pointers\n"; 
    }
};

int main() {
    Pair<int, double> p1;
    p1.info();  // "Generic pair of two different types"
    
    Pair<int, int> p2;
    p2.info();  // "Pair of two same types"
    
    Pair<int, double*> p3;
    p3.info();  // "Second element is a pointer"
    
    Pair<int*, double*> p4;
    p4.info();  // "Both elements are pointers"
    
    return 0;
}
```

**How the Compiler Chooses:**

The compiler picks the **most specialized** version that matches:

```cpp
Pair<int, double>    // Uses primary template (no specialization matches)
Pair<int, int>       // Uses Pair<T, T> (more specific than primary)
Pair<int, double*>   // Uses Pair<T, U*> (matches pointer pattern)
Pair<int*, double*>  // Uses Pair<T*, U*> (most specific match)
```

**Practical Example: Smart Pointer Behavior**

```cpp
#include <iostream>

// Primary template - regular values
template<typename T>
class SmartPtr {
private:
    T* ptr;
public:
    SmartPtr(T* p) : ptr(p) {}
    ~SmartPtr() { delete ptr; }
    
    T& operator*() { return *ptr; }
    T* operator->() { return ptr; }
    
    void info() { std::cout << "Regular SmartPtr\n"; }
};

// Partial specialization for arrays
template<typename T>
class SmartPtr<T[]> {
private:
    T* ptr;
public:
    SmartPtr(T* p) : ptr(p) {}
    ~SmartPtr() { delete[] ptr; }  // Use delete[] for arrays!
    
    T& operator[](size_t index) { return ptr[index]; }
    
    void info() { std::cout << "Array SmartPtr\n"; }
};

int main() {
    SmartPtr<int> p1(new int(42));
    p1.info();  // "Regular SmartPtr"
    std::cout << *p1 << '\n';  // 42
    
    SmartPtr<int[]> p2(new int[5]{1, 2, 3, 4, 5});
    p2.info();  // "Array SmartPtr"
    std::cout << p2[0] << '\n';  // 1
    
    return 0;
}
```

**More Specialization Patterns:**

```cpp
// Primary template
template<typename T, typename U>
class Example {};

// Partial specialization: T is a pointer
template<typename T, typename U>
class Example<T*, U> {};

// Partial specialization: T is const
template<typename T, typename U>
class Example<const T, U> {};

// Partial specialization: both are references
template<typename T, typename U>
class Example<T&, U&> {};

// Can combine patterns
template<typename T>
class Example<T*, T*> {};  // Both are pointers to same type
```

**Why Can't Functions Be Partially Specialized?**

Function templates can only be **fully specialized** or **overloaded**:

```cpp
// ❌ Can't do this with functions:
// template<typename T>
// void func<T*>(T* ptr) {}  // ERROR!

// ✅ Instead, use overloading:
template<typename T>
void func(T value) {
    std::cout << "Generic version\n";
}

template<typename T>
void func(T* ptr) {
    std::cout << "Pointer version\n";
}

int main() {
    int x = 42;
    func(x);   // Calls generic version
    func(&x);  // Calls pointer version
    
    return 0;
}
```

**Key Takeaways:**

1. **Full specialization**: Exact type (`MyClass<int>`)
2. **Partial specialization**: Pattern of types (`MyClass<T*>`, `MyClass<T, T>`)
3. Partial specialization **only for classes**, not functions
4. Compiler chooses the most specialized matching version
5. Common use: type traits, smart pointers, containers

---

## Variadic Templates (C++11)

Variadic templates are one of the most powerful C++11 features. They allow templates to accept **any number of arguments** of **any types** - the foundation for functions like `std::make_tuple`, `std::make_unique`, and many others.

**What Does "Variadic" Mean?**

"Variadic" = variable number of arguments

```cpp
// Regular function - fixed number of parameters
void print(int a, int b) { }

// Variadic template - any number of parameters!
template<typename... Args>
void print(Args... args) { }

print(1);                    // 1 argument
print(1, 2.5);              // 2 arguments
print(1, "hello", 3.14, 'x'); // 4 arguments - all different types!
```

### Basic Syntax

**The Core Syntax:**

```cpp
template<typename... Args>  // Args is a "template parameter pack"
void func(Args... args) {   // args is a "function parameter pack"
    // Args... = zero or more types
    // args... = zero or more values
}
```

**Understanding the `...` (ellipsis):**

- `typename... Args` - declares a parameter pack (can hold multiple types)
- `Args...` - expands the pack
- Think of it like an array of types/values, but resolved at compile time

### Recursive Pattern

The most common pattern uses **recursion** with a base case:

```cpp
#include <iostream>

// Base case: no arguments left
void print() {
    std::cout << "(end)\n";
}

// Recursive case: at least one argument
template<typename First, typename... Rest>
void print(First first, Rest... rest) {
    std::cout << first << ' ';  // Process first argument
    print(rest...);             // Recursively process the rest
}

int main() {
    print();                        // "(end)"
    print(1);                       // "1 (end)"
    print(1, 2.5);                 // "1 2.5 (end)"
    print(1, "hello", 3.14, 'x');  // "1 hello 3.14 x (end)"
    
    return 0;
}
```

**How This Works (Step-by-Step):**

Let's trace `print(1, "hello", 3.14)`:

```
Call 1: print(1, "hello", 3.14)
  First = int (value: 1)
  Rest = {const char*, double} (values: "hello", 3.14)
  Output: "1 "
  Next: print("hello", 3.14)

Call 2: print("hello", 3.14)
  First = const char* (value: "hello")
  Rest = {double} (value: 3.14)
  Output: "hello "
  Next: print(3.14)

Call 3: print(3.14)
  First = double (value: 3.14)
  Rest = {} (empty)
  Output: "3.14 "
  Next: print()

Call 4: print()
  Base case
  Output: "(end)"
  
Final output: "1 hello 3.14 (end)"
```

### Using sizeof... to Count Parameters

You can get the number of arguments in a parameter pack at **compile time**:

```cpp
#include <iostream>

template<typename... Args>
void info(Args... args) {
    std::cout << "Number of arguments: " << sizeof...(Args) << '\n';
    std::cout << "Or use args: " << sizeof...(args) << '\n';  // Same result
}

int main() {
    info();                        // 0
    info(1);                       // 1
    info(1, 2.5);                 // 2
    info(1, "hi", 3.14, 'x');     // 4
    
    return 0;
}
```

**Important:** `sizeof...(Args)` is **not** the sizeof operator! It's a special operator that counts pack elements.

### Practical Example: Generic Sum

```cpp
#include <iostream>

// Base case: sum of nothing is 0
auto sum() {
    return 0;
}

// Recursive case: first + sum of rest
template<typename First, typename... Rest>
auto sum(First first, Rest... rest) {
    return first + sum(rest...);
}

int main() {
    std::cout << sum() << '\n';                // 0
    std::cout << sum(1) << '\n';               // 1
    std::cout << sum(1, 2, 3) << '\n';        // 6
    std::cout << sum(1.5, 2.5, 3.0) << '\n';  // 7.0
    std::cout << sum(1, 2.5, 3) << '\n';      // 6.5 (mixed types work!)
    
    return 0;
}
```

**How sum(1, 2, 3) Evaluates:**

```
sum(1, 2, 3)
= 1 + sum(2, 3)
= 1 + (2 + sum(3))
= 1 + (2 + (3 + sum()))
= 1 + (2 + (3 + 0))
= 1 + (2 + 3)
= 1 + 5
= 6
```

### Variadic Class Templates

You can also create variadic class templates:

```cpp
#include <iostream>

// Simple tuple (just for demonstration)
template<typename... Types>
class SimpleTuple;

// Specialization: empty tuple
template<>
class SimpleTuple<> {
public:
    void print() const {
        std::cout << "(empty tuple)\n";
    }
};

// Specialization: at least one element
template<typename First, typename... Rest>
class SimpleTuple<First, Rest...> : private SimpleTuple<Rest...> {
private:
    First value;
public:
    SimpleTuple(First v, Rest... r) 
        : SimpleTuple<Rest...>(r...), value(v) {}
    
    First& head() { return value; }
    
    void print() const {
        std::cout << value << " ";
        SimpleTuple<Rest...>::print();
    }
};

int main() {
    SimpleTuple<int, double, const char*> t(42, 3.14, "hello");
    t.print();  // 42 3.14 hello (empty tuple)
    
    std::cout << "First element: " << t.head() << '\n';  // 42
    
    return 0;
}
```

### Perfect Forwarding with Variadic Templates

A common use case is creating factory functions that forward arguments:

```cpp
#include <memory>
#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;
public:
    Person(std::string n, int a) : name(std::move(n)), age(a) {
        std::cout << "Created: " << name << ", age " << age << '\n';
    }
};

// Generic factory - forwards any number of arguments
template<typename T, typename... Args>
std::unique_ptr<T> make_unique(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}

int main() {
    // Pass constructor arguments directly
    auto p1 = make_unique<Person>("Alice", 25);  // Created: Alice, age 25
    auto p2 = make_unique<Person>("Bob", 30);    // Created: Bob, age 30
    
    return 0;
}
```

**What's Happening:**

```cpp
make_unique<Person>("Alice", 25)
// T = Person
// Args... = {const char* (or std::string), int}
// args... = {"Alice", 25}
// Expands to: new Person("Alice", 25)
```

### Common Patterns

**1. Apply a function to all arguments:**

```cpp
#include <iostream>

template<typename Func, typename... Args>
void apply_to_all(Func f, Args... args) {
    // Trick: use initializer list to force evaluation
    int dummy[] = {0, ((void)f(args), 0)...};
    (void)dummy;  // Suppress unused variable warning
}

void print_value(auto x) { 
    std::cout << x << ' '; 
}

int main() {
    apply_to_all(print_value, 1, 2, 3, 4, 5);  // 1 2 3 4 5
    std::cout << '\n';
    
    return 0;
}
```

**2. Check properties of all types:**

```cpp
#include <type_traits>

// Check if all types are integral
template<typename... Args>
constexpr bool all_integral = (std::is_integral_v<Args> && ...);

static_assert(all_integral<int, char, long>);      // ✅ Pass
// static_assert(all_integral<int, double, char>);  // ❌ Fail - double not integral
```

**3. Get the nth type:**

```cpp
template<size_t N, typename First, typename... Rest>
struct nth_type {
    using type = typename nth_type<N - 1, Rest...>::type;
};

template<typename First, typename... Rest>
struct nth_type<0, First, Rest...> {
    using type = First;
};

// Usage:
using Type0 = nth_type<0, int, double, char>::type;  // int
using Type1 = nth_type<1, int, double, char>::type;  // double
using Type2 = nth_type<2, int, double, char>::type;  // char
```

📖 [cppreference: Parameter pack](https://en.cppreference.com/w/cpp/language/parameter_pack)

### Fold Expressions (C++17)

C++17 introduced **fold expressions** - a much cleaner and more concise way to work with variadic templates! Instead of writing recursive functions, you can use fold expressions to apply binary operators to all elements in a parameter pack.

**The Problem Without Fold Expressions:**

```cpp
// Old way - need base case + recursive case
auto sum() { return 0; }

template<typename First, typename... Rest>
auto sum(First first, Rest... rest) {
    return first + sum(rest...);
}
```

**The Solution With Fold Expressions:**

```cpp
// New way - one line!
template<typename... Args>
auto sum(Args... args) {
    return (args + ...);  // That's it!
}
```

### Four Types of Fold Expressions

**1. Unary Right Fold: `(pack op ...)`**

Expands as: `E1 op (E2 op (... op (EN-1 op EN)))`

```cpp
template<typename... Args>
auto sum(Args... args) {
    return (args + ...);
}

// sum(1, 2, 3, 4) expands to:
// 1 + (2 + (3 + 4))
```

**2. Unary Left Fold: `(... op pack)`**

Expands as: `(((E1 op E2) op E3) op ...) op EN`

```cpp
template<typename... Args>
auto sum(Args... args) {
    return (... + args);
}

// sum(1, 2, 3, 4) expands to:
// (((1 + 2) + 3) + 4)
```

**3. Binary Right Fold: `(pack op ... op init)`**

Expands as: `E1 op (E2 op (... op (EN op init)))`

```cpp
template<typename... Args>
auto sum(Args... args) {
    return (args + ... + 0);  // init value is 0
}

// sum(1, 2, 3) expands to:
// 1 + (2 + (3 + 0))
// This way sum() with no args returns 0, not an error
```

**4. Binary Left Fold: `(init op ... op pack)`**

Expands as: `(((init op E1) op E2) op ...) op EN`

```cpp
template<typename... Args>
auto sum(Args... args) {
    return (0 + ... + args);  // init value is 0
}

// sum(1, 2, 3) expands to:
// (((0 + 1) + 2) + 3)
```

### Practical Examples

**Sum of Numbers:**

```cpp
#include <iostream>

template<typename... Args>
auto sum(Args... args) {
    return (args + ...);
}

int main() {
    std::cout << sum(1, 2, 3, 4, 5) << '\n';  // 15
    std::cout << sum(1.5, 2.5, 3.0) << '\n';  // 7.0
    
    return 0;
}
```

**Product of Numbers:**

```cpp
template<typename... Args>
auto product(Args... args) {
    return (args * ... * 1);  // Binary fold with init value 1
}

int main() {
    std::cout << product(2, 3, 4) << '\n';  // 24
    std::cout << product() << '\n';         // 1 (empty - returns init value)
    
    return 0;
}
```

**Logical AND:**

```cpp
template<typename... Args>
bool all_true(Args... args) {
    return (args && ...);  // All must be true
}

int main() {
    std::cout << all_true(true, true, true) << '\n';   // 1 (true)
    std::cout << all_true(true, false, true) << '\n';  // 0 (false)
    std::cout << all_true(1, 1, 0) << '\n';            // 0 (false)
    
    return 0;
}
```

**Logical OR:**

```cpp
template<typename... Args>
bool any_true(Args... args) {
    return (args || ...);  // Any can be true
}

int main() {
    std::cout << any_true(false, false, true) << '\n';  // 1 (true)
    std::cout << any_true(0, 0, 0) << '\n';             // 0 (false)
    
    return 0;
}
```

**Print All Arguments:**

```cpp
#include <iostream>

template<typename... Args>
void print(Args... args) {
    // Use comma operator in fold expression
    ((std::cout << args << '\n'), ...);
}

int main() {
    print(1, "hello", 3.14, 'x');
    // Output:
    // 1
    // hello
    // 3.14
    // x
    
    return 0;
}
```

**How the Print Fold Works:**

```cpp
((std::cout << args << '\n'), ...)

// With print(1, 2, 3), expands to:
((std::cout << 1 << '\n'), ((std::cout << 2 << '\n'), (std::cout << 3 << '\n')))

// Comma operator evaluates left-to-right and returns the right operand
// So this prints each value on its own line
```

**Comparison - Check if All Equal:**

```cpp
template<typename T, typename... Args>
bool all_equal(T first, Args... args) {
    return ((first == args) && ...);
}

int main() {
    std::cout << all_equal(5, 5, 5, 5) << '\n';     // 1 (true)
    std::cout << all_equal(5, 5, 6, 5) << '\n';     // 0 (false)
    std::cout << all_equal("hi", "hi", "hi") << '\n'; // 1 (true)
    
    return 0;
}
```

### Supported Operators

All binary operators work with fold expressions:

```cpp
// Arithmetic: + - * / %
(args + ...)
(args - ...)
(args * ...)

// Bitwise: & | ^ << >>
(args & ...)
(args | ...)
(args ^ ...)

// Comparison: == != < > <= >=
((args == value) && ...)

// Logical: && ||
(args && ...)
(args || ...)

// Other: , .* ->*
((cout << args), ...)
```

### Advanced Example: Type Checking

```cpp
#include <type_traits>
#include <iostream>

// Check if all types are integral
template<typename... Args>
constexpr bool all_integral() {
    return (std::is_integral_v<Args> && ...);
}

// Check if any type is a pointer
template<typename... Args>
constexpr bool any_pointer() {
    return (std::is_pointer_v<Args> || ...);
}

int main() {
    std::cout << all_integral<int, char, long>() << '\n';      // 1 (true)
    std::cout << all_integral<int, double, char>() << '\n';    // 0 (false)
    
    std::cout << any_pointer<int, char*, double>() << '\n';    // 1 (true)
    std::cout << any_pointer<int, char, double>() << '\n';     // 0 (false)
    
    return 0;
}
```

### Practical: Push Multiple Elements to Container

```cpp
#include <vector>
#include <iostream>

template<typename Container, typename... Args>
void push_back_all(Container& c, Args&&... args) {
    (c.push_back(std::forward<Args>(args)), ...);
}

int main() {
    std::vector<int> vec;
    push_back_all(vec, 1, 2, 3, 4, 5);
    
    for (int x : vec) {
        std::cout << x << ' ';  // 1 2 3 4 5
    }
    std::cout << '\n';
    
    return 0;
}
```

### When to Use Fold Expressions vs Recursion

**Use Fold Expressions When:**
- Applying a binary operator to all elements
- Simple operations (sum, product, AND, OR, etc.)
- Want concise, readable code
- C++17 or later is available

**Use Recursion When:**
- Need more complex logic per element
- Different handling for first/last element
- Building complex data structures
- Need to maintain state across calls

**Comparison:**

```cpp
// Fold - simple and clean for sum
template<typename... Args>
auto sum_fold(Args... args) {
    return (args + ...);  // One line!
}

// Recursion - more verbose but more flexible
auto sum_recursive() { return 0; }
template<typename First, typename... Rest>
auto sum_recursive(First first, Rest... rest) {
    // Could add logging, validation, transformations, etc.
    return first + sum_recursive(rest...);
}
```

**Key Takeaways:**

1. Fold expressions simplify variadic template code dramatically
2. Four types: unary/binary × left/right
3. Works with all binary operators
4. Binary folds allow initialization values
5. Use `(expr, ...)` pattern for sequencing operations
6. Much more readable than recursive approaches for simple operations

📖 [cppreference: Fold expression](https://en.cppreference.com/w/cpp/language/fold)

---

## Template Template Parameters

Template template parameters are one of the most advanced template features. They allow you to pass a **template itself** as a template parameter - not just a type, but a whole template!

**What's the Difference?**

```cpp
// Regular template parameter - takes a TYPE
template<typename T>
class Container { /* ... */ };

Container<int> c1;           // T = int
Container<std::string> c2;   // T = std::string

// Template template parameter - takes a TEMPLATE
template<typename T, template<typename> class Container>
class Stack { /* ... */ };

Stack<int, std::vector> s1;  // Container = std::vector (the template itself!)
Stack<int, std::list> s2;    // Container = std::list
```

### Why Use Template Template Parameters?

They let you write code that works with **families of templates** rather than just specific types. This is useful when:
- You want to parameterize which container to use
- Building generic adapters or wrappers
- Creating policies that themselves are templates

### Basic Example

**Problem:** You want a Stack that can use different underlying containers:

```cpp
#include <vector>
#include <list>
#include <deque>
#include <iostream>

// Template template parameter!
template<typename T, template<typename, typename> class Container>
class Stack {
private:
    // Container is a template, so we instantiate it with T and allocator
    Container<T, std::allocator<T>> data;
    
public:
    void push(const T& value) {
        data.push_back(value);
    }
    
    T pop() {
        T value = data.back();
        data.pop_back();
        return value;
    }
    
    bool empty() const {
        return data.empty();
    }
    
    size_t size() const {
        return data.size();
    }
};

int main() {
    // Use vector as underlying container
    Stack<int, std::vector> vecStack;
    vecStack.push(1);
    vecStack.push(2);
    vecStack.push(3);
    std::cout << "Vec stack size: " << vecStack.size() << '\n';  // 3
    
    // Use list as underlying container
    Stack<std::string, std::list> listStack;
    listStack.push("Hello");
    listStack.push("World");
    std::cout << "List stack pop: " << listStack.pop() << '\n';  // "World"
    
    // Use deque as underlying container
    Stack<double, std::deque> dequeStack;
    dequeStack.push(1.1);
    dequeStack.push(2.2);
    std::cout << "Deque stack size: " << dequeStack.size() << '\n';  // 2
    
    return 0;
}
```

**Understanding the Syntax:**

```cpp
template<typename T, template<typename, typename> class Container>
//                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                   This says: Container is a template that takes 2 type parameters
class Stack {
    Container<T, std::allocator<T>> data;
    //        ^^^^^^^^^^^^^^^^^^^^
    //        Instantiate the Container template with T and an allocator
};
```

**Why Two `typename` Parameters?**

STL containers like `std::vector`, `std::list`, etc. actually take **two** template parameters:
```cpp
template<typename T, typename Allocator = std::allocator<T>>
class vector { /* ... */ };

// So when we use it as a template template parameter:
template<typename T, template<typename, typename> class Container>
//                            ^^^^^^^^^^^^^^^^^^
//                            Match vector's signature: (T, Allocator)
```

### C++17: Simpler Syntax with `typename`

C++17 allows using `typename` instead of `class` for template template parameters:

```cpp
// C++11/14 - must use 'class'
template<typename T, template<typename, typename> class Container>
class Stack { /* ... */ };

// C++17 - can use 'typename' (more consistent)
template<typename T, template<typename, typename> typename Container>
class Stack { /* ... */ };
```

### Practical Example: Generic Adapter

Create an adapter that works with any container template:

```cpp
#include <vector>
#include <list>
#include <iostream>

template<typename T, template<typename> class Container>
class ReverseAdapter {
private:
    Container<T> data;
    
public:
    void add(const T& value) {
        data.push_back(value);
    }
    
    void print_reverse() const {
        // Print in reverse order
        for (auto it = data.rbegin(); it != data.rend(); ++it) {
            std::cout << *it << ' ';
        }
        std::cout << '\n';
    }
};

// Simple container template for testing
template<typename T>
class SimpleVector {
private:
    std::vector<T> vec;
public:
    void push_back(const T& v) { vec.push_back(v); }
    auto rbegin() const { return vec.rbegin(); }
    auto rend() const { return vec.rend(); }
};

int main() {
    ReverseAdapter<int, SimpleVector> adapter;
    adapter.add(1);
    adapter.add(2);
    adapter.add(3);
    adapter.print_reverse();  // 3 2 1
    
    return 0;
}
```

### Default Template Template Parameters

You can provide defaults:

```cpp
#include <vector>
#include <iostream>

// Default to std::vector
template<typename T, template<typename, typename> class Container = std::vector>
class MyStack {
private:
    Container<T, std::allocator<T>> data;
public:
    void push(const T& value) {
        data.push_back(value);
    }
    
    T& top() {
        return data.back();
    }
};

int main() {
    MyStack<int> stack1;        // Uses std::vector by default
    stack1.push(42);
    
    MyStack<int, std::deque> stack2;  // Explicitly use std::deque
    stack2.push(99);
    
    return 0;
}
```

### Variadic Template Template Parameters (C++11)

You can combine variadic templates with template template parameters:

```cpp
#include <vector>
#include <map>
#include <iostream>

// Variadic template template parameter
template<typename T, template<typename...> class Container>
class FlexibleStack {
private:
    Container<T> data;
public:
    void push(const T& value) {
        data.push_back(value);
    }
    
    bool empty() const {
        return data.empty();
    }
};

int main() {
    // std::vector has multiple template params (T, Allocator)
    // But Container<typename...> can match any number!
    FlexibleStack<int, std::vector> stack;
    stack.push(1);
    stack.push(2);
    
    return 0;
}
```

**Why `typename...`?**

```cpp
template<typename...> class Container
//       ^^^^^^^^^^^^
//       This matches templates with ANY number of parameters

// So it matches:
// vector<T, Allocator>         - 2 parameters
// map<K, V, Compare, Allocator> - 4 parameters
// array<T, N>                  - 1 type + 1 non-type
```

### Real-World Example: Policy-Based Design

```cpp
#include <iostream>
#include <memory>

// Different allocation strategies (policies)
template<typename T>
class HeapAllocator {
public:
    T* allocate() { 
        std::cout << "Heap allocation\n";
        return new T(); 
    }
    void deallocate(T* ptr) { delete ptr; }
};

template<typename T>
class StackAllocator {
private:
    char buffer[sizeof(T)];
public:
    T* allocate() { 
        std::cout << "Stack allocation\n";
        return reinterpret_cast<T*>(buffer); 
    }
    void deallocate(T*) { /* No-op for stack */ }
};

// Class that uses a policy
template<typename T, template<typename> class AllocPolicy>
class Manager {
private:
    AllocPolicy<T> allocator;
    T* resource;
    
public:
    Manager() : resource(nullptr) {}
    
    void acquire() {
        resource = allocator.allocate();
    }
    
    void release() {
        if (resource) {
            allocator.deallocate(resource);
            resource = nullptr;
        }
    }
    
    ~Manager() {
        release();
    }
};

int main() {
    Manager<int, HeapAllocator> heapMgr;
    heapMgr.acquire();  // "Heap allocation"
    
    Manager<int, StackAllocator> stackMgr;
    stackMgr.acquire();  // "Stack allocation"
    
    return 0;
}
```

### Common Pitfalls

**1. Parameter Count Mismatch:**

```cpp
// This won't work if Container expects 2 parameters!
template<typename T, template<typename> class Container>
class MyClass {
    Container<T> data;  // ERROR if using std::vector!
};

// std::vector actually needs: std::vector<T, Allocator>
// So you need:
template<typename T, template<typename, typename> class Container>
class MyClass {
    Container<T, std::allocator<T>> data;  // ✅ OK
};

// Or use variadic (C++11):
template<typename T, template<typename...> class Container>
class MyClass {
    Container<T> data;  // ✅ OK - matches any number of params
};
```

**2. Non-Type Parameters:**

```cpp
// std::array has a non-type parameter: std::array<T, N>
template<typename T, template<typename, typename> class Container>
class MyClass { /* ... */ };  // Won't work with std::array!

// Need to account for non-type parameter:
template<typename T, size_t N, template<typename, size_t> class Container>
class MyClass {
    Container<T, N> data;
};
```

### When to Use Template Template Parameters

**Good Use Cases:**
- Container adapters (stack, queue using different underlying containers)
- Policy-based design
- Generic wrappers that work with template families
- Building meta-programming libraries

**Alternatives to Consider:**
- Sometimes regular template parameters with type aliases are simpler
- Duck typing (just require certain members) can be more flexible
- Concepts (C++20) provide better constraints

**Key Takeaways:**

1. Template template parameters take **templates** as arguments, not types
2. Must match the parameter count of the template
3. Use `template<typename...>` for variadic matching (C++11)
4. Can use `typename` instead of `class` (C++17)
5. Powerful for policy-based design and generic adapters
6. Allows templates as parameters for correct answers (like in your exam question!)

📖 [cppreference: Template template parameters](https://en.cppreference.com/w/cpp/language/template_parameters#Template_template_parameter)

---

## SFINAE and Enable If

SFINAE stands for **"Substitution Failure Is Not An Error"** - one of the most important but confusing C++ template features. It's the mechanism that makes template overloading work.

**What is SFINAE?**

When the compiler tries to instantiate a template and fails, instead of producing an error, it simply **removes that template from consideration** and tries other candidates.

### Understanding SFINAE by Example

```cpp
#include <iostream>

// Version 1: For types with a .size() member
template<typename T>
auto get_size(T& container) -> decltype(container.size()) {
    std::cout << "Has .size() member\n";
    return container.size();
}

// Version 2: For types without .size() (arrays, etc.)
template<typename T, size_t N>
size_t get_size(T (&array)[N]) {
    std::cout << "Is an array\n";
    return N;
}

int main() {
    std::vector<int> vec = {1, 2, 3};
    std::cout << get_size(vec) << '\n';  // Uses version 1: "Has .size() member" 3
    
    int arr[] = {1, 2, 3, 4, 5};
    std::cout << get_size(arr) << '\n';  // Uses version 2: "Is an array" 5
    
    return 0;
}
```

**What Happens:**

1. For `get_size(vec)`:
   - Compiler tries version 1: `decltype(vec.size())` → works! (vec has .size())
   - Compiler tries version 2: doesn't match pattern
   - Chooses version 1

2. For `get_size(arr)`:
   - Compiler tries version 1: `decltype(arr.size())` → FAILS (arrays don't have .size())
   - **SFINAE**: Failure is NOT an error, just remove version 1 from candidates
   - Compiler tries version 2: matches pattern `T (&array)[N]`
   - Chooses version 2

### std::enable_if - Controlling Overload Resolution

`std::enable_if` is a utility that uses SFINAE to conditionally enable/disable templates based on compile-time conditions.

**Basic Syntax:**

```cpp
// If condition is true, ::type is the specified type (default: void)
// If condition is false, ::type doesn't exist → SFINAE!
std::enable_if<condition, Type>::type
```

**Simple Example:**

```cpp
#include <iostream>
#include <type_traits>

// Only enabled for integral types (int, char, long, etc.)
template<typename T>
typename std::enable_if<std::is_integral<T>::value, T>::type
double_value(T value) {
    std::cout << "Integral version\n";
    return value * 2;
}

// Only enabled for floating-point types (float, double)
template<typename T>
typename std::enable_if<std::is_floating_point<T>::value, T>::type
double_value(T value) {
    std::cout << "Floating-point version\n";
    return value * 2.0;
}

int main() {
    std::cout << double_value(5) << '\n';      // "Integral version" → 10
    std::cout << double_value(2.5) << '\n';    // "Floating-point version" → 5.0
    
    // double_value("hello");  // ERROR: no matching function
    //                         // (string is neither integral nor floating-point)
    
    return 0;
}
```

**How It Works:**

```cpp
double_value(5)  // T = int
// Version 1: is_integral<int>::value = true
//   std::enable_if<true, int>::type = int  ✅ Exists!
// Version 2: is_floating_point<int>::value = false
//   std::enable_if<false, int>::type  ❌ Doesn't exist → SFINAE
// Chooses version 1

double_value(2.5)  // T = double
// Version 1: is_integral<double>::value = false
//   std::enable_if<false, double>::type  ❌ Doesn't exist → SFINAE
// Version 2: is_floating_point<double>::value = true
//   std::enable_if<true, double>::type = double  ✅ Exists!
// Chooses version 2
```

### C++14: std::enable_if_t (Cleaner Syntax)

C++14 added `_t` aliases to make the syntax cleaner:

```cpp
// C++11 - verbose
typename std::enable_if<condition, Type>::type

// C++14 - cleaner
std::enable_if_t<condition, Type>
```

**Example:**

```cpp
#include <iostream>
#include <type_traits>

// C++14 version
template<typename T>
std::enable_if_t<std::is_integral_v<T>, T>
double_value(T value) {
    return value * 2;
}

template<typename T>
std::enable_if_t<std::is_floating_point_v<T>, T>
double_value(T value) {
    return value * 2.0;
}

int main() {
    std::cout << double_value(5) << '\n';    // 10
    std::cout << double_value(2.5) << '\n';  // 5.0
    
    return 0;
}
```

### Using enable_if in Template Parameters

You can also use `enable_if` directly in template parameters (often cleaner):

```cpp
#include <iostream>
#include <type_traits>

// Put enable_if in template parameter list
template<typename T, typename = std::enable_if_t<std::is_integral_v<T>>>
T triple(T value) {
    std::cout << "Integral version\n";
    return value * 3;
}

template<typename T, typename = std::enable_if_t<std::is_floating_point_v<T>>>
T triple(T value) {
    std::cout << "Floating-point version\n";
    return value * 3.0;
}

int main() {
    std::cout << triple(4) << '\n';    // "Integral version" → 12
    std::cout << triple(1.5) << '\n';  // "Floating-point version" → 4.5
    
    return 0;
}
```

### Practical Example: Different Implementations Based on Type

```cpp
#include <iostream>
#include <vector>
#include <type_traits>

// For pointer types - dereference and print
template<typename T>
std::enable_if_t<std::is_pointer_v<T>, void>
print(T value) {
    std::cout << "Pointer: " << *value << '\n';
}

// For non-pointer types - print directly
template<typename T>
std::enable_if_t<!std::is_pointer_v<T>, void>
print(T value) {
    std::cout << "Value: " << value << '\n';
}

int main() {
    int x = 42;
    int* ptr = &x;
    
    print(x);     // "Value: 42"
    print(ptr);   // "Pointer: 42"
    print(3.14);  // "Value: 3.14"
    
    return 0;
}
```

### C++17: if constexpr (Better Alternative)

C++17 introduced `if constexpr` which often provides a cleaner solution than `enable_if`:

```cpp
#include <iostream>
#include <type_traits>

// Single function with if constexpr
template<typename T>
T triple(T value) {
    if constexpr (std::is_integral_v<T>) {
        std::cout << "Integral version\n";
        return value * 3;
    } else if constexpr (std::is_floating_point_v<T>) {
        std::cout << "Floating-point version\n";
        return value * 3.0;
    } else {
        static_assert(std::is_arithmetic_v<T>, "Must be numeric type");
    }
}

int main() {
    std::cout << triple(4) << '\n';      // "Integral version" → 12
    std::cout << triple(1.5) << '\n';    // "Floating-point version" → 4.5
    
    // triple("hello");  // Compile error with message
    
    return 0;
}
```

**Advantages of `if constexpr`:**
- Evaluated at compile time (no runtime overhead)
- More readable than multiple `enable_if` versions
- Easier to write complex conditions
- Can have `else` branches

### Advanced SFINAE: Detecting Member Functions

A classic SFINAE pattern - detect if a class has a specific member:

```cpp
#include <iostream>
#include <type_traits>
#include <string>

// Primary template - assume no .size() member
template<typename T, typename = void>
struct has_size : std::false_type {};

// Specialization - only enabled if .size() exists
template<typename T>
struct has_size<T, std::void_t<decltype(std::declval<T>().size())>> 
    : std::true_type {};

// Helper variable template (C++17)
template<typename T>
inline constexpr bool has_size_v = has_size<T>::value;

int main() {
    std::cout << has_size_v<std::vector<int>> << '\n';  // 1 (true)
    std::cout << has_size_v<std::string> << '\n';       // 1 (true)
    std::cout << has_size_v<int> << '\n';               // 0 (false)
    std::cout << has_size_v<int*> << '\n';              // 0 (false)
    
    return 0;
}
```

### When to Use SFINAE vs if constexpr vs Concepts

**Use SFINAE/enable_if when:**
- Need different function overloads (not just different behavior)
- C++14 or earlier
- Creating type traits
- Want separate template instantiations

**Use if constexpr when:**
- Different behavior within same function
- C++17 or later
- More readable conditional logic
- Don't need separate overloads

**Use Concepts when:**
- C++20 or later
- Want clear, readable constraints
- Better error messages
- Document requirements

**Comparison:**

```cpp
// SFINAE - verbose but flexible
template<typename T>
std::enable_if_t<std::is_integral_v<T>, void>
process(T value) { /* ... */ }

template<typename T>
std::enable_if_t<std::is_floating_point_v<T>, void>
process(T value) { /* ... */ }

// if constexpr - cleaner, single function
template<typename T>
void process(T value) {
    if constexpr (std::is_integral_v<T>) {
        /* ... */
    } else if constexpr (std::is_floating_point_v<T>) {
        /* ... */
    }
}

// Concepts (C++20) - most readable
template<std::integral T>
void process(T value) { /* ... */ }

template<std::floating_point T>
void process(T value) { /* ... */ }
```

**Key Takeaways:**

1. **SFINAE** = "Substitution Failure Is Not An Error"
2. Template substitution failures don't cause errors, just remove that template from consideration
3. `std::enable_if` uses SFINAE to conditionally enable templates
4. C++14 added `_t` and `_v` aliases for cleaner syntax
5. C++17's `if constexpr` is often a better alternative
6. C++20 Concepts are the modern, most readable approach
7. SFINAE is fundamental to how template overloading works

📖 [cppreference: SFINAE](https://en.cppreference.com/w/cpp/language/sfinae)
📖 [cppreference: std::enable_if](https://en.cppreference.com/w/cpp/types/enable_if)

---

## Concepts (C++20)

Concepts are C++20's answer to template constraints - a way to specify **requirements** for template parameters in a clear, readable way. They provide better error messages and make template code self-documenting.

**The Problem Before Concepts:**

```cpp
template<typename T>
T add(T a, T b) {
    return a + b;
}

// add(5, 3);           // OK
// add("hello", "world"); // Cryptic error about operator+!
```

Error message might be:
```
error: no match for 'operator+' (operand types are 'const char*' and 'const char*')
   note: in instantiation of function template specialization 'add<const char *>' requested here
   ... 50 more lines of template backtrace ...
```

**The Solution With Concepts:**

```cpp
#include <concepts>

template<typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};

template<Addable T>
T add(T a, T b) {
    return a + b;
}

// add(5, 3);           // OK
// add("hello", "world"); // Clear error: const char* doesn't satisfy Addable!
```

Error message now:
```
error: cannot call function 'add' because 'const char*' does not satisfy Addable
```

### Defining Concepts

**Basic Syntax:**

```cpp
template<typename T>
concept ConceptName = constraint-expression;
```

**Simple Examples:**

```cpp
#include <concepts>

// T must be an integral type (int, char, long, etc.)
template<typename T>
concept Integral = std::is_integral_v<T>;

// T must support addition
template<typename T>
concept Addable = requires(T a, T b) {
    a + b;  // Must be able to add
};

// T must be numeric (integral or floating-point)
template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

// T must have a size() member function
template<typename T>
concept HasSize = requires(T t) {
    { t.size() } -> std::convertible_to<std::size_t>;
};
```

### Using Concepts

**Four Ways to Apply Concepts:**

```cpp
#include <concepts>

// 1. Concept name as template parameter (most concise)
template<std::integral T>
T triple(T value) {
    return value * 3;
}

// 2. Requires clause after template parameters
template<typename T>
requires std::integral<T>
T quadruple(T value) {
    return value * 4;
}

// 3. Trailing requires clause
template<typename T>
T quintuple(T value) requires std::integral<T> {
    return value * 5;
}

// 4. Abbreviated function template (auto + concept)
auto sextuple(std::integral auto value) {
    return value * 6;
}

int main() {
    triple(5);      // ✅ OK
    quadruple(10);  // ✅ OK
    quintuple(15);  // ✅ OK
    sextuple(20);   // ✅ OK
    
    // triple(3.14);   // ❌ Error: double is not integral
    
    return 0;
}
```

### Standard Library Concepts

C++20 provides many useful concepts in `<concepts>`:

```cpp
#include <concepts>
#include <iostream>

// Type categories
template<std::integral T>  // int, char, long, etc.
void process_int(T value) {
    std::cout << "Integral: " << value << '\n';
}

template<std::floating_point T>  // float, double
void process_float(T value) {
    std::cout << "Floating: " << value << '\n';
}

// Comparison concepts
template<std::equality_comparable T>
bool are_equal(T a, T b) {
    return a == b;
}

template<std::totally_ordered T>
bool is_less(T a, T b) {
    return a < b;
}

// Callable concepts
template<std::invocable<int> Func>
void call_with_42(Func f) {
    f(42);
}

int main() {
    process_int(5);      // ✅
    process_float(3.14); // ✅
    
    std::cout << are_equal(10, 10) << '\n';   // 1
    std::cout << is_less(5, 10) << '\n';      // 1
    
    call_with_42([](int x) { std::cout << x << '\n'; });  // 42
    
    return 0;
}
```

**Common Standard Concepts:**

```cpp
// Type categories
std::integral<T>
std::floating_point<T>
std::signed_integral<T>
std::unsigned_integral<T>

// Comparison
std::equality_comparable<T>
std::totally_ordered<T>

// Objects
std::copyable<T>
std::movable<T>
std::default_initializable<T>

// Callable
std::invocable<F, Args...>
std::predicate<F, Args...>

// Other
std::same_as<T, U>
std::convertible_to<From, To>
std::derived_from<Derived, Base>
```

### requires Expression

The `requires` expression lets you specify detailed requirements:

```cpp
#include <concepts>
#include <iostream>

// Concept: T must support arithmetic operations
template<typename T>
concept Arithmetic = requires(T a, T b) {
    { a + b } -> std::same_as<T>;  // Addition returns T
    { a - b } -> std::same_as<T>;  // Subtraction returns T
    { a * b } -> std::same_as<T>;  // Multiplication returns T
    { a / b } -> std::same_as<T>;  // Division returns T
};

// Concept: Container must have certain members
template<typename T>
concept Container = requires(T c) {
    typename T::value_type;        // Must have value_type member
    typename T::iterator;          // Must have iterator member
    { c.begin() } -> std::same_as<typename T::iterator>;
    { c.end() } -> std::same_as<typename T::iterator>;
    { c.size() } -> std::convertible_to<std::size_t>;
    { c.empty() } -> std::convertible_to<bool>;
};

template<Arithmetic T>
T compute(T a, T b) {
    return (a + b) * (a - b) / a;
}

template<Container C>
void process(const C& container) {
    std::cout << "Size: " << container.size() << '\n';
    std::cout << "Empty: " << container.empty() << '\n';
}

int main() {
    std::cout << compute(10, 5) << '\n';  // Works with int
    std::cout << compute(10.0, 5.0) << '\n';  // Works with double
    
    std::vector<int> vec = {1, 2, 3};
    process(vec);  // Works with vector
    
    return 0;
}
```

**requires Expression Syntax:**

```cpp
requires(parameters) {
    requirement1;
    requirement2;
    // ...
}
```

**Types of Requirements:**

```cpp
template<typename T>
concept Example = requires(T t, T a, T b) {
    // Simple requirement - expression must be valid
    t.foo();
    
    // Type requirement - type must exist
    typename T::value_type;
    
    // Compound requirement - expression must be valid AND satisfy constraints
    { a + b } -> std::same_as<T>;
    { t.size() } -> std::convertible_to<std::size_t>;
    { t.empty() } noexcept -> std::convertible_to<bool>;  // Also must not throw
    
    // Nested requirement - another concept must be satisfied
    requires std::integral<typename T::value_type>;
};
```

### Combining Concepts

You can combine concepts with logical operators:

```cpp
#include <concepts>

// Logical AND
template<typename T>
concept SignedIntegral = std::integral<T> && std::signed_integral<T>;

// Logical OR
template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

// More complex
template<typename T>
concept CopyableAndComparable = 
    std::copyable<T> && std::equality_comparable<T>;

// Multiple constraints
template<typename T>
T clamp(T value, T min, T max) 
    requires std::totally_ordered<T> && std::copyable<T>
{
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

int main() {
    auto x = clamp(5, 1, 10);      // 5
    auto y = clamp(15, 1, 10);     // 10
    auto z = clamp(-5, 1, 10);     // 1
    
    return 0;
}
```

### Practical Example: Generic Algorithm

```cpp
#include <concepts>
#include <vector>
#include <list>
#include <iostream>

// Concept for types that can be compared
template<typename T>
concept Comparable = requires(T a, T b) {
    { a < b } -> std::convertible_to<bool>;
};

// Concept for containers we can iterate
template<typename C>
concept IterableContainer = requires(C c) {
    { c.begin() } -> std::input_or_output_iterator;
    { c.end() } -> std::input_or_output_iterator;
    requires Comparable<typename C::value_type>;
};

// Find minimum element in any compatible container
template<IterableContainer C>
typename C::value_type find_min(const C& container) {
    auto it = container.begin();
    auto min_val = *it;
    ++it;
    
    for (; it != container.end(); ++it) {
        if (*it < min_val) {
            min_val = *it;
        }
    }
    
    return min_val;
}

int main() {
    std::vector<int> vec = {5, 2, 8, 1, 9};
    std::cout << "Min in vector: " << find_min(vec) << '\n';  // 1
    
    std::list<double> lst = {3.14, 2.71, 1.41, 1.73};
    std::cout << "Min in list: " << find_min(lst) << '\n';    // 1.41
    
    return 0;
}
```

### Concepts vs SFINAE vs if constexpr

**Comparison:**

```cpp
// SFINAE - hard to read, cryptic errors
template<typename T>
std::enable_if_t<std::is_integral_v<T>, T>
double_value(T x) { return x * 2; }

// if constexpr - readable but uses if statement
template<typename T>
T double_value(T x) {
    if constexpr (std::is_integral_v<T>) {
        return x * 2;
    } else {
        static_assert(std::is_integral_v<T>, "Must be integral");
    }
}

// Concepts - most readable, best errors
template<std::integral T>
T double_value(T x) { return x * 2; }
```

**When to Use Each:**

| Feature | Best For | Availability |
|---------|----------|--------------|
| **Concepts** | New code, clear constraints, best errors | C++20 |
| **if constexpr** | Compile-time branches, algorithm selection | C++17 |
| **SFINAE** | Legacy code, complex metaprogramming | C++11+ |

### Benefits of Concepts

1. **Readable constraints**: Intent is clear
2. **Better error messages**: Compiler says "doesn't satisfy Concept" instead of template instantiation errors
3. **Self-documenting**: Function signature shows requirements
4. **Enables overloading**: Different implementations for different concepts
5. **Compile-time checks**: Catch errors early

**Error Message Comparison:**

```cpp
// Without concepts
template<typename T>
T add(T a, T b) { return a + b; }

add("hello", "world");  
// Error: no match for operator+ (operand types are 'const char*'...)
//        [50 lines of template instantiation backtrace]

// With concepts
template<std::integral T>
T add(T a, T b) { return a + b; }

add("hello", "world");
// Error: const char* does not satisfy std::integral
//        [Clean, clear error!]
```

**Key Takeaways:**

1. Concepts define **requirements** for template parameters
2. Much clearer than SFINAE or static_assert
3. Better error messages
4. Standard library provides many useful concepts
5. Can combine with `&&`, `||`, `!`
6. Four syntax options for applying concepts
7. Use `requires` expressions for detailed constraints
8. The modern C++ way to constrain templates

📖 [cppreference: Constraints and concepts](https://en.cppreference.com/w/cpp/language/constraints)
📖 [cppreference: Standard library concepts](https://en.cppreference.com/w/cpp/concepts)

---

## Template Aliases (C++11)

Template aliases provide a way to create **shorthand names** for complex template types. They're like typedef but much more powerful because they can be templates themselves!

**The Problem:**

```cpp
// Long, repetitive type names
std::vector<int> vec1;
std::vector<std::string> vec2;
std::map<std::string, std::vector<int>> map1;
std::map<std::string, std::vector<std::string>> map2;

// Ugly typedefs
typedef std::vector<int> IntVector;
typedef std::vector<std::string> StringVector;
// Can't make a generic "Vector" typedef!
```

**The Solution: Template Aliases:**

```cpp
// Create alias for std::vector
template<typename T>
using Vec = std::vector<T>;

// Create alias for std::map
template<typename K, typename V>
using Dict = std::map<K, V>;

Vec<int> vec1;            // Instead of std::vector<int>
Vec<std::string> vec2;    // Instead of std::vector<std::string>
Dict<std::string, int> ages;  // Instead of std::map<std::string, int>
```

### Basic Syntax

```cpp
template<template-parameters>
using AliasName = type-expression;
```

**Simple Examples:**

```cpp
#include <vector>
#include <string>
#include <map>

// Alias for std::vector
template<typename T>
using Vec = std::vector<T>;

// Alias for std::map with string keys
template<typename V>
using StringDict = std::map<std::string, V>;

// Alias for pair
template<typename T, typename U>
using Pair = std::pair<T, U>;

int main() {
    Vec<int> numbers = {1, 2, 3, 4, 5};
    StringDict<int> ages = {{"Alice", 30}, {"Bob", 25}};
    Pair<std::string, double> item = {"apple", 1.99};
    
    return 0;
}
```

### Why Use Template Aliases?

**1. Simplify Complex Types:**

```cpp
// Without alias - verbose and error-prone
std::unique_ptr<std::map<std::string, std::vector<int>>> data1;
std::unique_ptr<std::map<std::string, std::vector<int>>> data2;

// With alias - clear and concise
template<typename T>
using Ptr = std::unique_ptr<T>;

template<typename V>
using StringToVec = std::map<std::string, std::vector<V>>;

Ptr<StringToVec<int>> data1;
Ptr<StringToVec<int>> data2;
```

**2. Partially Bind Template Parameters:**

```cpp
#include <vector>
#include <memory>

// "Fix" some template parameters
template<typename T>
using IntMap = std::map<int, T>;  // Key is always int

template<typename T>
using SharedVec = std::shared_ptr<std::vector<T>>;  // Always shared_ptr of vector

int main() {
    IntMap<std::string> id_to_name;
    id_to_name[1] = "Alice";
    id_to_name[2] = "Bob";
    
    SharedVec<int> numbers = std::make_shared<std::vector<int>>();
    numbers->push_back(42);
    
    return 0;
}
```

**3. Create Domain-Specific Names:**

```cpp
#include <vector>
#include <string>
#include <unordered_map>

// Domain-specific aliases make code self-documenting
using UserId = int;
using UserName = std::string;
using Email = std::string;

template<typename T>
using UserMap = std::unordered_map<UserId, T>;

template<typename T>
using EmailMap = std::unordered_map<Email, T>;

int main() {
    UserMap<UserName> user_names;
    user_names[1] = "Alice";
    user_names[2] = "Bob";
    
    EmailMap<UserId> email_to_id;
    email_to_id["alice@example.com"] = 1;
    
    return 0;
}
```

### Template Aliases vs typedef

**typedef Limitations:**

```cpp
// ❌ Can't create a template typedef
// typedef std::vector<T> Vec<T>;  // ERROR!

// Must create specific typedef for each type
typedef std::vector<int> IntVec;
typedef std::vector<double> DoubleVec;
typedef std::vector<std::string> StringVec;
// ... tedious!
```

**Template Alias Solution:**

```cpp
// ✅ Can create template aliases
template<typename T>
using Vec = std::vector<T>;

// Use with any type
Vec<int> v1;
Vec<double> v2;
Vec<std::string> v3;
```

**typedef Still Useful for Non-Template Aliases:**

```cpp
// Simple type aliases - typedef and using are equivalent
typedef std::string String;        // typedef style
using String = std::string;        // using style (preferred in modern C++)

using UserID = int;                // Modern style
using Callback = void(*)(int);     // Function pointer alias
```

### Practical Examples

**1. Simplifying STL Containers:**

```cpp
#include <vector>
#include <map>
#include <set>
#include <memory>

template<typename T>
using Vec = std::vector<T>;

template<typename K, typename V>
using Map = std::map<K, V>;

template<typename T>
using Set = std::set<T>;

template<typename T>
using Ptr = std::unique_ptr<T>;

template<typename T>
using SharedPtr = std::shared_ptr<T>;

int main() {
    Vec<int> numbers = {1, 2, 3};
    Map<std::string, int> ages = {{"Alice", 30}};
    Set<double> unique_values = {1.1, 2.2, 3.3};
    Ptr<int> p1 = std::make_unique<int>(42);
    SharedPtr<int> p2 = std::make_shared<int>(99);
    
    return 0;
}
```

**2. Custom Allocators:**

```cpp
#include <vector>
#include <memory>

// Alias for vector with custom allocator
template<typename T>
using PoolVec = std::vector<T, std::allocator<T>>;

// In real code, you'd use a custom pool allocator
template<typename T>
using FastVec = std::vector<T, std::allocator<T>>;  // Replace with fast allocator

int main() {
    PoolVec<int> vec1;
    FastVec<double> vec2;
    
    return 0;
}
```

**3. Function Pointers and Callbacks:**

```cpp
#include <functional>
#include <iostream>

// Alias for function types
template<typename Ret, typename... Args>
using Func = std::function<Ret(Args...)>;

// Specific callback types
using Callback = Func<void, int>;
using Predicate = Func<bool, int>;
using Transform = Func<int, int>;

void execute(Callback cb) {
    cb(42);
}

bool check(Predicate pred) {
    return pred(10);
}

int main() {
    Callback print = [](int x) { std::cout << x << '\n'; };
    execute(print);  // 42
    
    Predicate is_positive = [](int x) { return x > 0; };
    std::cout << check(is_positive) << '\n';  // 1
    
    return 0;
}
```

**4. Iterator Aliases:**

```cpp
#include <vector>
#include <list>

template<typename Container>
using Iterator = typename Container::iterator;

template<typename Container>
using ConstIterator = typename Container::const_iterator;

template<typename Container>
using ValueType = typename Container::value_type;

int main() {
    std::vector<int> vec = {1, 2, 3};
    
    Iterator<std::vector<int>> it = vec.begin();
    ConstIterator<std::vector<int>> cit = vec.cbegin();
    ValueType<std::vector<int>> val = vec[0];  // int
    
    return 0;
}
```

**5. Matrix and Nested Containers:**

```cpp
#include <vector>

// 2D matrix
template<typename T>
using Matrix = std::vector<std::vector<T>>;

// 3D matrix
template<typename T>
using Matrix3D = std::vector<std::vector<std::vector<T>>>;

// Graph representation
using Graph = std::vector<std::vector<int>>;  // Adjacency list

int main() {
    Matrix<int> mat2d = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    Matrix3D<double> mat3d;
    
    Graph graph = {
        {1, 2},     // Node 0 connects to nodes 1, 2
        {0, 2, 3},  // Node 1 connects to nodes 0, 2, 3
        {0, 1},     // Node 2 connects to nodes 0, 1
        {1}         // Node 3 connects to node 1
    };
    
    return 0;
}
```

### Member Type Aliases

Template aliases work great for extracting member types:

```cpp
#include <vector>
#include <map>
#include <type_traits>

// Extract value_type from containers
template<typename Container>
using ValueType = typename Container::value_type;

// Extract key_type from maps
template<typename Map>
using KeyType = typename Map::key_type;

// Extract mapped_type from maps
template<typename Map>
using MappedType = typename Map::mapped_type;

int main() {
    std::vector<int> vec;
    ValueType<decltype(vec)> val = 42;  // int
    
    std::map<std::string, double> prices;
    KeyType<decltype(prices)> key = "apple";      // std::string
    MappedType<decltype(prices)> value = 1.99;    // double
    
    return 0;
}
```

### Advanced: Conditional Aliases

Combine with `std::conditional` for compile-time selection:

```cpp
#include <vector>
#include <list>
#include <type_traits>

// Choose container based on compile-time condition
template<typename T, bool UseVector>
using Container = typename std::conditional<UseVector, 
                                            std::vector<T>, 
                                            std::list<T>>::type;

int main() {
    Container<int, true> vec;   // std::vector<int>
    Container<int, false> lst;  // std::list<int>
    
    vec.push_back(1);
    lst.push_back(2);
    
    return 0;
}
```

### Common Patterns

**Pair and Tuple Aliases:**

```cpp
#include <utility>
#include <tuple>
#include <string>

template<typename T, typename U>
using Pair = std::pair<T, U>;

template<typename... Types>
using Tuple = std::tuple<Types...>;

// Domain-specific
using Point2D = Pair<double, double>;
using Point3D = Tuple<double, double, double>;
using NameAge = Pair<std::string, int>;

int main() {
    Point2D p2d = {3.5, 7.2};
    Point3D p3d = {1.0, 2.0, 3.0};
    NameAge person = {"Alice", 30};
    
    return 0;
}
```

**Smart Pointer Aliases:**

```cpp
#include <memory>

template<typename T>
using UniquePtr = std::unique_ptr<T>;

template<typename T>
using SharedPtr = std::shared_ptr<T>;

template<typename T>
using WeakPtr = std::weak_ptr<T>;

class MyClass {};

int main() {
    UniquePtr<MyClass> u = std::make_unique<MyClass>();
    SharedPtr<MyClass> s = std::make_shared<MyClass>();
    WeakPtr<MyClass> w = s;
    
    return 0;
}
```

### Best Practices

**DO:**
- Use aliases to simplify complex types
- Create domain-specific names for clarity
- Use `using` instead of `typedef` in modern C++
- Document what your aliases represent

**DON'T:**
- Overuse aliases (balance clarity vs. abstraction)
- Hide important type information
- Create aliases for already simple types
- Use overly generic names (e.g., `Data`, `Type`)

**Key Takeaways:**

1. Template aliases create **parameterized type names**
2. More powerful than `typedef` - can be templates
3. Simplify complex types and reduce repetition
4. Can partially specialize template parameters
5. Use `using` syntax (modern C++)
6. Great for STL containers, smart pointers, function types
7. Make code more readable and self-documenting
8. No runtime overhead - pure compile-time feature

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

