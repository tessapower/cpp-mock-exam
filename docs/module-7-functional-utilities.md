# Module 7: STL Functional Objects and Utilities

## Overview

Welcome to the world of **functional programming in C++**! This module covers how C++ lets you treat functions as first-class objects—meaning you can store them in variables, pass them around, and manipulate them just like any other data.

**What you'll learn:**

- How to use pre-built function objects from the STL
- How to create and work with lambdas (anonymous functions)
- How to store and pass around different types of callables
- Modern techniques vs. deprecated approaches
- When to use each tool in real-world scenarios

**Why does this matter?**

Function objects are the backbone of the STL algorithms. They let you customize behavior without writing loops, making your code more expressive and often more efficient.

📖 [cppreference: Function objects](https://en.cppreference.com/w/cpp/utility/functional)

---

## Part 1: Understanding "Callables"

Before we dive in, let's understand what a "callable" is in C++. A callable is anything you can invoke with parentheses `()`:

```cpp
// 1. Regular function
int add(int a, int b) { return a + b; }

// 2. Function pointer
int (*func_ptr)(int, int) = add;

// 3. Lambda (anonymous function)
auto lambda = [](int a, int b) { return a + b; };

// 4. Functor (class with operator())
struct Adder {
    int operator()(int a, int b) const { return a + b; }
};
Adder functor;

// All can be called the same way:
int result = add(2, 3);          // 5
result = func_ptr(2, 3);         // 5
result = lambda(2, 3);           // 5
result = functor(2, 3);          // 5
```

**The Power:** STL algorithms accept any callable, giving you flexibility in how you define behavior.

---

## Part 2: Standard Function Objects (The Building Blocks)

The STL provides ready-made function objects for common operations. Think of them as pre-written lambdas you can use anywhere.

### Arithmetic Operations

**The Problem:** You need to combine two containers element-wise.

**Without function objects (manual loop):**

```cpp
std::vector<int> v1 = {1, 2, 3, 4};
std::vector<int> v2 = {10, 20, 30, 40};
std::vector<int> result(4);

// Manual loop - verbose
for (size_t i = 0; i < v1.size(); ++i) {
    result[i] = v1[i] + v2[i];
}
```

**With std::plus (elegant):**

```cpp
#include <functional>
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v1 = {1, 2, 3, 4};
    std::vector<int> v2 = {10, 20, 30, 40};
    std::vector<int> result(4);

    // std::plus is a functor that adds two values
    // std::transform applies it to each pair of elements
    std::transform(v1.begin(), v1.end(), v2.begin(), result.begin(),
                   std::plus<int>());
    // result: {11, 22, 33, 44}
    // Equivalent to: result[i] = v1[i] + v2[i] for each i

    // Other arithmetic functors work the same way:
    std::transform(v1.begin(), v1.end(), v2.begin(), result.begin(),
                   std::multiplies<int>());
    // result: {10, 40, 90, 160}
    // Equivalent to: result[i] = v1[i] * v2[i]

    return 0;
}
```

**Available Arithmetic Functors:**

- `std::plus<T>()` - adds two values (a + b)
- `std::minus<T>()` - subtracts (a - b)
- `std::multiplies<T>()` - multiplies (a * b)
- `std::divides<T>()` - divides (a / b)
- `std::modulus<T>()` - remainder (a % b)
- `std::negate<T>()` - negates single value (-a)

**When to use:** When you need a simple operation and want to avoid writing a lambda. They're especially useful with algorithms like `std::transform`, `std::accumulate`, etc.

### Comparison Operations

**The Need:** Algorithms like `std::sort` need to know how to compare elements. By default, they use `<`, but what if you want different ordering?

```cpp
#include <functional>
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {5, 2, 8, 1, 9};

    // Default sort: ascending order (uses operator<)
    std::sort(vec.begin(), vec.end());
    // vec: {1, 2, 5, 8, 9}

    // Sort descending using std::greater
    // std::greater<int>() is equivalent to: [](int a, int b) { return a > b; }
    std::sort(vec.begin(), vec.end(), std::greater<int>());
    // vec: {9, 8, 5, 2, 1}

    // Use with other algorithms:
    std::vector<int> data = {10, 20, 30, 40, 50};

    // Find first element equal to 30
    auto it = std::find_if(data.begin(), data.end(),
                           std::bind(std::equal_to<int>(), std::placeholders::_1, 30));
    // Better with lambda: [](int x) { return x == 30; }

    return 0;
}
```

**Available Comparison Functors:**

- `std::equal_to<T>()` - checks equality (a == b)
- `std::not_equal_to<T>()` - checks inequality (a != b)
- `std::greater<T>()` - greater than (a > b) - **common for reverse sorting**
- `std::less<T>()` - less than (a < b) - **default for most containers**
- `std::greater_equal<T>()` - greater or equal (a >= b)
- `std::less_equal<T>()` - less or equal (a <= b)

**Common Use Cases:**

```cpp
// Priority queue with custom ordering (min-heap instead of max-heap)
std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap;

// Map with reverse key ordering
std::map<int, std::string, std::greater<int>> reverse_map;

// Find elements in a range
auto count = std::count_if(vec.begin(), vec.end(),
                           std::bind(std::greater<int>(), std::placeholders::_1, 5));
// Counts elements > 5
```

**Modern Note:**

While these functors are still useful for container templates, lambdas are often clearer for algorithms:

```cpp
// Old style
std::sort(vec.begin(), vec.end(), std::greater<int>());

// Modern style (more explicit about what you're comparing)
std::sort(vec.begin(), vec.end(), [](int a, int b) { return a > b; });
```

📖 [cppreference: Comparison operations](https://en.cppreference.com/w/cpp/utility/functional)

---

## Part 3: Modern C++ Utilities

### std::function - The Universal Callable Container

**What is it?**

`std::function` is a type-erased wrapper that can hold ANY callable with a matching signature. Think of it as a "container for functions."

**Type Erasure Explained:**

Different callables (functions, lambdas, functors) have different types. `std::function` hides these differences, letting you store them all in one type.

```cpp
#include <functional>
#include <iostream>
#include <vector>

int add(int a, int b) { return a + b; }

struct Multiplier {
    int factor;
    int operator()(int x) const { return x * factor; }
};

int main() {
    // Can store function pointers
    std::function<int(int, int)> f1 = add;
    std::cout << f1(2, 3) << '\n';  // 5

    // Can store lambdas
    std::function<int(int, int)> f2 = [](int a, int b) { return a * b; };
    std::cout << f2(2, 3) << '\n';  // 6

    // Can store functors
    std::function<int(int)> f3 = Multiplier{10};
    std::cout << f3(5) << '\n';  // 50

    // Can store member functions (with std::bind)
    std::string str = "hello";
    std::function<size_t()> f4 = std::bind(&std::string::size, &str);
    std::cout << f4() << '\n';  // 5

    return 0;
}
```

**Why Use std::function?**

1. **Storing different callable types together:**
```cpp
std::vector<std::function<int(int)>> operations;

operations.push_back([](int x) { return x * 2; });        // lambda
operations.push_back([](int x) { return x + 10; });       // another lambda
operations.push_back(Multiplier{5});                      // functor

// Apply all operations
int value = 3;
for (const auto& op : operations) {
    value = op(value);  // Works with all types!
}
std::cout << value << '\n';  // 41 = ((3 * 2) + 10) * 5
```

2. **Callback systems:**
```cpp
class Button {
    std::function<void()> onClick;
public:
    void setClickHandler(std::function<void()> handler) {
        onClick = handler;
    }

    void click() {
        if (onClick) onClick();  // Call the stored function
    }
};

Button btn;
btn.setClickHandler([]() { std::cout << "Clicked!\n"; });
btn.click();  // Prints: Clicked!
```

3. **Polymorphic function storage:**
```cpp
std::map<std::string, std::function<double(double, double)>> operations;
operations["add"] = [](double a, double b) { return a + b; };
operations["multiply"] = [](double a, double b) { return a * b; };

double result = operations["add"](5, 3);  // 8
```

**When NOT to use std::function:**

❌ **Performance-critical code** - it has overhead (virtual call, heap allocation)
❌ **When you know the exact type** - use `auto` or template parameters instead
❌ **Simple one-time use** - just pass lambda directly

```cpp
// ❌ SLOW - unnecessary overhead
void process(std::function<bool(int)> pred) { /* ... */ }

// ✅ FAST - template deduction, can be inlined
template<typename Pred>
void process(Pred pred) { /* ... */ }

// Or in C++20:
void process(auto pred) { /* ... */ }
```

**Checking if std::function is empty:**
```cpp
std::function<void()> f;
if (!f) {
    std::cout << "Empty - don't call it!\n";
}

f = []() { std::cout << "Now assigned!\n"; };
if (f) {
    f();  // Safe to call
}
```

📖 [cppreference: std::function](https://en.cppreference.com/w/cpp/utility/functional/function)

### std::bind - Partial Function Application

**What is it?**
`std::bind` creates a new callable by "fixing" some arguments of an existing function. This is called "partial application."

**The Concept:**
Imagine you have a function that takes 3 arguments, but you want to create a version that only takes 2 (with the first one pre-set).

```cpp
#include <functional>
#include <iostream>

int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    using namespace std::placeholders;

    // Original function: add(a, b, c)
    std::cout << add(10, 5, 3) << '\n';  // 18

    // Bind first argument to 10
    // Now we have: add10(b, c) which calls add(10, b, c)
    auto add10 = std::bind(add, 10, _1, _2);
    //                          ^   ^   ^
    //                          |   |   |
    //                          |   |   second new parameter
    //                          |   first new parameter
    //                          fixed value

    std::cout << add10(5, 3) << '\n';  // 18 (same as add(10, 5, 3))

    // Reorder arguments
    // _1 becomes b, _2 becomes a, _3 becomes c
    auto reordered = std::bind(add, _2, _1, _3);
    std::cout << reordered(1, 2, 3) << '\n';  // 6 (calls add(2, 1, 3))

    return 0;
}
```

**Understanding Placeholders:**

- `_1` means "the first argument passed to the new function"
- `_2` means "the second argument passed to the new function"
- `_3` means "the third argument passed to the new function"
- Actual values (like `10`) are fixed and always used

```cpp
// Visual breakdown:
auto f = std::bind(someFunc, 100, _2, _1, 42);
//                           ^    ^   ^   ^
//                           |    |   |   |
// When calling f(X, Y):     |    Y   X   |
// Actually calls:      someFunc(100, Y, X, 42)
```

**Real Use Case - Member Functions:**

```cpp
struct Calculator {
    int multiply(int a, int b) { return a * b; }
};

Calculator calc;

// Bind member function to object
auto multiply_on_calc = std::bind(&Calculator::multiply, &calc, _1, _2);
std::cout << multiply_on_calc(3, 4) << '\n';  // 12
```

**Why Lambdas Are Usually Better:**

```cpp
// Using std::bind - harder to read
auto f1 = std::bind(add, 10, _1, _2);

// Using lambda - crystal clear!
auto f2 = [](int b, int c) { return add(10, b, c); };

// Both do the same thing, but lambda is:
// ✓ More readable
// ✓ Better optimized by compilers
// ✓ Easier to debug
// ✓ More flexible (can add logic)
```

**When std::bind Is Still Useful:**

1. **With member functions** (though lambdas still work):
```cpp
std::vector<std::string> words = {"hello", "world"};
// Using bind
std::transform(words.begin(), words.end(), /* ... */,
               std::bind(&std::string::size, std::placeholders::_1));

// Using lambda (clearer)
std::transform(words.begin(), words.end(), /* ... */,
               [](const std::string& s) { return s.size(); });
```

2. **Legacy code** - you'll see it in older codebases

**Common Pitfalls:**

```cpp
int value = 5;

// ❌ DANGER - binds by value (copies value)
auto bad = std::bind(increment, value);
bad();  // Increments the COPY, not original

// ✅ CORRECT - use std::ref to bind by reference
auto good = std::bind(increment, std::ref(value));
good();  // Increments the original
```

📖 [cppreference: std::bind](https://en.cppreference.com/w/cpp/utility/functional/bind)

### std::mem_fn - Calling Member Functions

**The Problem:**
Member functions can't be called directly like regular functions. You need an object.

```cpp
struct Person {
    std::string name;
    std::string getName() const { return name; }
};

Person p{"Alice"};
// Regular function call syntax doesn't work:
// getName()  // ❌ Error - need an object!
p.getName();  // ✅ Works
```

**What std::mem_fn Does:**
It converts a member function pointer into a callable that can be used with algorithms.

```cpp
#include <functional>
#include <vector>
#include <algorithm>
#include <string>
#include <iostream>

int main() {
    std::vector<std::string> words = {"hello", "world", "cpp"};
    std::vector<size_t> lengths;

    // Using std::mem_fn
    // Transforms &std::string::size into a callable: [](const string& s) { return s.size(); }
    std::transform(words.begin(), words.end(),
                   std::back_inserter(lengths),
                   std::mem_fn(&std::string::size));
    // lengths: {5, 5, 3}

    // What it's doing under the hood:
    auto size_caller = std::mem_fn(&std::string::size);
    for (const auto& word : words) {
        std::cout << size_caller(word) << ' ';  // Calls word.size()
    }

    return 0;
}
```

**More Examples:**

```cpp
struct Calculator {
    int add(int x) { return value + x; }
    int value = 10;
};

std::vector<Calculator> calcs = {{10}, {20}, {30}};
std::vector<int> results;

// Call add(5) on each calculator
auto add_5 = std::mem_fn(&Calculator::add);
std::transform(calcs.begin(), calcs.end(),
               std::back_inserter(results),
               std::bind(add_5, std::placeholders::_1, 5));
// results: {15, 25, 35}
```

**Modern Alternative - Lambdas:**

Most of the time, lambdas are clearer:

```cpp
// Using std::mem_fn (older style)
std::transform(words.begin(), words.end(),
               std::back_inserter(lengths),
               std::mem_fn(&std::string::size));

// Using lambda (modern, clearer)
std::transform(words.begin(), words.end(),
               std::back_inserter(lengths),
               [](const std::string& s) { return s.size(); });
```

**When std::mem_fn Is Useful:**

1. **When you need to store the member function caller:**
```cpp
std::function<size_t(const std::string&)> get_size = std::mem_fn(&std::string::size);
// Can reuse this callable multiple times
```

2. **With pointer/reference wrappers:**
```cpp
std::vector<std::reference_wrapper<std::string>> word_refs;
// std::mem_fn works seamlessly with reference_wrapper
std::transform(word_refs.begin(), word_refs.end(), /* ... */,
               std::mem_fn(&std::string::size));
```

📖 [cppreference: std::mem_fn](https://en.cppreference.com/w/cpp/utility/functional/mem_fn)

### std::not_fn (C++17) - Negating Predicates

**The Problem:**

Sometimes you have a predicate (a function that returns true/false), but you need the opposite logic.

**Without std::not_fn:**

```cpp
auto is_even = [](int x) { return x % 2 == 0; };
auto is_odd = [](int x) { return x % 2 != 0; };  // Have to write both!
```

**With std::not_fn:**
```cpp
#include <functional>
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};

    auto is_even = [](int x) { return x % 2 == 0; };

    // Find first odd number (negate is_even)
    // std::not_fn creates: [](int x) { return !is_even(x); }
    auto it = std::find_if(vec.begin(), vec.end(), std::not_fn(is_even));
    std::cout << *it << '\n';  // 1 (first odd number)

    // More examples:

    // Remove all odd numbers (keep even)
    vec.erase(std::remove_if(vec.begin(), vec.end(), std::not_fn(is_even)),
              vec.end());
    // vec: {2, 4}

    return 0;
}
```

**Why Use It:**

1. **Code reuse** - define one predicate, get its opposite for free
2. **Clarity** - makes intent obvious: "not even" vs writing new logic
3. **Replaces deprecated `std::not1` and `std::not2`** from C++98

**Practical Example:**

```cpp
struct Person {
    std::string name;
    int age;
    bool isAdult() const { return age >= 18; }
};

std::vector<Person> people = {
    {"Alice", 25}, {"Bob", 16}, {"Charlie", 30}, {"Diana", 15}
};

// Find first minor (not adult)
auto minor = std::find_if(people.begin(), people.end(),
                          std::not_fn(std::mem_fn(&Person::isAdult)));
// Found: Bob (16)

// Count minors
int minor_count = std::count_if(people.begin(), people.end(),
                                std::not_fn(std::mem_fn(&Person::isAdult)));
// minor_count: 2
```

**Modern Alternative:**

For simple cases, a lambda is just as clear:

```cpp
// Using std::not_fn
std::find_if(vec.begin(), vec.end(), std::not_fn(is_even));

// Using lambda (equally clear)
std::find_if(vec.begin(), vec.end(), [&](int x) { return !is_even(x); });
```

**Choose std::not_fn when:**

- You want to emphasize that you're negating an existing predicate
- You need to pass it to a template that expects a callable
- You're working with complex predicates

📖 [cppreference: std::not_fn](https://en.cppreference.com/w/cpp/utility/functional/not_fn)

---

## Part 4: Reference Wrappers

### std::ref / std::cref - Passing References Through Copy APIs

**The Problem:**

Many STL functions and utilities (like `std::bind`, `std::thread`, `std::make_tuple`) copy their arguments by default. But what if you need to pass a reference?

**Why This Matters:**

```cpp
void increment(int& x) { ++x; }

int value = 5;

// This WON'T work as expected:
auto f = std::bind(increment, value);  // Copies value!
f();
std::cout << value;  // Still 5 - the copy was incremented
```

**The Solution: std::ref**

`std::ref` creates a `std::reference_wrapper` - a copyable object that acts like a reference.

```cpp
#include <functional>
#include <vector>
#include <algorithm>
#include <iostream>

void increment(int& x) { ++x; }

int main() {
    int value = 5;

    // ❌ Problem: std::bind copies by default
    auto bad = std::bind(increment, value);
    bad();
    std::cout << value << '\n';  // 5 (unchanged!)

    // ✅ Solution: use std::ref
    auto good = std::bind(increment, std::ref(value));
    good();
    std::cout << value << '\n';  // 6 (changed!)

    // std::cref for const references
    const int const_val = 10;
    auto reader = std::bind([](const int& x) { return x * 2; }, std::cref(const_val));
    std::cout << reader() << '\n';  // 20

    return 0;
}
```

**Using with Containers:**

```cpp
// You can't store raw references in containers
// std::vector<int&> refs;  // ❌ Compile error!

// But you CAN store reference_wrappers:
std::vector<std::reference_wrapper<int>> refs;

int a = 1, b = 2, c = 3;
refs.push_back(std::ref(a));
refs.push_back(std::ref(b));
refs.push_back(std::ref(c));

// Modify through references
for (auto& ref : refs) {
    ref.get() *= 2;  // .get() returns the actual reference
}
std::cout << a << ' ' << b << ' ' << c << '\n';  // 2 4 6
```

**Common Use Cases:**

1. **With std::thread:**
```cpp
void modify(int& x) { x *= 2; }

int value = 10;
// Pass by reference to thread
std::thread t(modify, std::ref(value));
t.join();
std::cout << value;  // 20
```

2. **With parallel algorithms:**
```cpp
int sum = 0;
std::for_each(std::execution::par, vec.begin(), vec.end(),
              [&sum](int x) { sum += x; });  // Race condition!

// Better: use std::ref explicitly in some contexts
```

3. **With std::async:**
```cpp
void compute(std::vector<int>& results) {
    // Fill results...
}

std::vector<int> data;
auto future = std::async(compute, std::ref(data));
future.wait();
// data is now filled
```

**Key Points:**

- `std::ref(x)` creates a `reference_wrapper<T>` for mutable references
- `std::cref(x)` creates a `reference_wrapper<const T>` for const references
- Use `.get()` to extract the actual reference from a `reference_wrapper`
- Necessary when APIs copy arguments but you need reference semantics

📖 [cppreference: std::ref](https://en.cppreference.com/w/cpp/utility/functional/ref)

---

## Part 5: Deprecated Utilities (Know for Exam!)

### ⚠️ Deprecated in C++11, Removed in C++17

**These were useful in C++98/03, but modern C++ has better alternatives. You
should know them for reading old code and for exams, but NEVER use them in
new projects.**

```cpp
// DON'T USE THESE IN NEW CODE!

// std::bind1st, std::bind2nd - DEPRECATED
// Old way to bind first/second argument of binary function
// Example: bind1st(less<int>(), 5)  → checks if 5 < x
// Use std::bind or lambdas instead

// std::ptr_fun - DEPRECATED
// Old way to wrap function pointers
// Not needed in modern C++ (automatic conversion)

// std::mem_fun, std::mem_fun_ref - DEPRECATED
// Old way to wrap member functions
// Use std::mem_fn instead

// std::not1, std::not2 - DEPRECATED
// Old way to negate unary/binary predicates
// Use std::not_fn instead
```

**Modern Replacements:**

| Deprecated            | Modern Alternative     | Example                              |
|-----------------------|------------------------|--------------------------------------|
| `bind1st/bind2nd`     | `std::bind` or lambdas | `[](int x) { return x > 5; }`        |
| `ptr_fun`             | Not needed             | Just pass function directly          |
| `mem_fun/mem_fun_ref` | `std::mem_fn`          | `std::mem_fn(&Class::method)`        |
| `not1/not2`           | `std::not_fn`          | `std::not_fn(predicate)`             |

**Migration Examples:**

```cpp
// OLD (C++98):
std::count_if(vec.begin(), vec.end(), 
              std::bind1st(std::greater<int>(), 5));
// Counts elements where 5 > element

// MODERN (C++11+):
std::count_if(vec.begin(), vec.end(),
              [](int x) { return 5 > x; });
// Much clearer!

// OLD (C++98):
std::transform(words.begin(), words.end(), lengths.begin(),
               std::mem_fun_ref(&std::string::size));

// MODERN (C++11+):
std::transform(words.begin(), words.end(), lengths.begin(),
               std::mem_fn(&std::string::size));
// Or even better:
std::transform(words.begin(), words.end(), lengths.begin(),
               [](const auto& s) { return s.size(); });
```

**Why They Were Removed:**

1. **Lambdas** are more flexible and readable
2. **Type deduction** works better with lambdas
3. **Performance** - lambdas can be inlined more easily
4. **Simplicity** - less to learn and remember

---

## Lambda vs std::bind

**Prefer lambdas in modern C++:**

```cpp
#include <functional>
#include <iostream>

int compute(int a, int b, int c) {
    return a + b * c;
}

int main() {
    using namespace std::placeholders;

    // Using std::bind (less clear)
    auto f1 = std::bind(compute, 10, _1, _2);

    // Using lambda (more clear!)
    auto f2 = [](int b, int c) { return compute(10, b, c); };

    std::cout << f1(5, 3) << '\n';  // 25
    std::cout << f2(5, 3) << '\n';  // 25

    // Lambdas are:
    // - More readable
    // - Often better optimized
    // - Easier to debug

    return 0;
}
```

---

## Practical Examples

### Using with Algorithms

```cpp
#include <functional>
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    std::vector<int> result(5);

    // Multiply all elements by 2 using std::multiplies
    std::transform(vec.begin(), vec.end(), result.begin(),
                   std::bind(std::multiplies<int>(), std::placeholders::_1, 2));

    // Lambda version (clearer!)
    std::transform(vec.begin(), vec.end(), result.begin(),
                   [](int x) { return x * 2; });

    for (int x : result) {
        std::cout << x << ' ';  // 2 4 6 8 10
    }

    return 0;
}
```

---

---

## Part 6: Understanding Lambdas - The Complete Guide

**Lambdas are the most important tool in modern C++ functional programming.**
They're anonymous functions defined right where you use them. Once you
understand lambdas, you'll rarely need the older utilities like `std::bind`.

### Lambda Syntax Breakdown

**The anatomy of a lambda:**

```cpp
[capture](parameters) -> return_type { body }
  ↑        ↑             ↑              ↑
  |        |             |              |
  |        |             |              Function body
  |        |             Return type (often auto-deduced)
  |        Parameters
  Capture clause - access to external variables
```

**Simplest possible lambda:**
```cpp
[]() {};  // Does nothing, takes nothing, captures nothing
```

**Real examples:**
```cpp
// No capture needed - pure function
auto add = [](int a, int b) { return a + b; };
std::cout << add(2, 3);  // 5

// Explicit return type (rarely needed)
auto divide = [](int a, int b) -> double { return static_cast<double>(a) / b; };

// Implicit return type (preferred)
auto divide_auto = [](int a, int b) { return static_cast<double>(a) / b; };
```

### Capture Modes - Accessing Outside Variables

**The Challenge:**
By default, lambdas can't access variables from their surrounding scope. You
must explicitly "capture" them.

**All Capture Modes:**

```cpp
int x = 10, y = 20;

// [] - Capture nothing (pure function)
auto f0 = []() { return 42; };  // ✅ OK
// auto f_bad = []() { return x; };  // ❌ Error: x not captured!

// [=] - Capture all by value (copy everything)
auto f1 = [=]() { return x + y; };  // x and y copied
// Captured values are CONST - can't modify them
// x++;  // ❌ Error: can't modify const copy

// [&] - Capture all by reference
auto f2 = [&]() { x++; y++; };  // Can modify x and y
f2();  // x is now 11, y is now 21

// [x] - Capture ONLY x by value
auto f3 = [x]() { return x * 2; };
// y not accessible inside!

// [&x] - Capture ONLY x by reference
auto f4 = [&x]() { x *= 2; };
f4();  // x is now 22

// [=, &x] - Capture all by value EXCEPT x by reference
auto f5 = [=, &x]() { x = y; };  // Can modify x, y is const copy

// [&, x] - Capture all by reference EXCEPT x by value
auto f6 = [&, x]() { y = x; };  // Can modify y, x is const copy

// [this] - Capture this pointer in member function
// [*this] - Capture entire object by value (C++17)
```

**When to Use Each:**

| Capture | Use When                         | Pros                    | Cons                               |
|---------|----------------------------------|-------------------------|------------------------------------|
| `[]`    | Pure function, no external state | Fast, safe              | Can't access anything              |
| `[=]`   | Read-only access to local vars   | Safe from dangling refs | Copies can be expensive            |
| `[&]`   | Need to modify local vars        | No copies, efficient    | Dangerous if lambda outlives scope |
| `[x]`   | Only need specific var(s)        | Clear, explicit         | Verbose for many vars              |
| `[&x]`  | Need to modify specific var(s)   | Efficient, explicit     | Risk of dangling ref               |

**Practical Examples:**

```cpp
// Example 1: Counting occurrences
std::vector<int> numbers = {1, 2, 3, 4, 5, 2, 3, 2};
int target = 2;
int count = 0;

// Capture target by value (read-only), count by reference (to modify)
std::for_each(numbers.begin(), numbers.end(), [target, &count](int n) {
    if (n == target) count++;
});
std::cout << "Found " << count << " occurrences\n";  // 3

// Example 2: Filtering with threshold
std::vector<int> prices = {50, 150, 200, 75, 300};
int max_price = 100;
std::vector<int> affordable;

std::copy_if(prices.begin(), prices.end(), 
             std::back_inserter(affordable),
             [max_price](int price) { return price <= max_price; });
// affordable: {50, 75}

// Example 3: Dangerous capture by reference!
std::function<int()> create_function() {
    int local = 42;
    return [&local]() { return local; };  // ❌ DANGER! local destroyed!
}
// Calling the returned function = undefined behavior!

// ✅ Safe version:
std::function<int()> create_function_safe() {
    int local = 42;
    return [local]() { return local; };  // ✅ Safe - copied
}
```

### Common Lambda Patterns

#### Pattern 1: Stateless Lambda (No Capture)

**Special property:** Can convert to function pointer!

```cpp
// Stateless lambda
auto is_even = [](int x) { return x % 2 == 0; };

// Can be used where function pointers are needed
using Predicate = bool(*)(int);
Predicate pred = is_even;  // ✅ Works because no capture

// Common with algorithms
std::vector<int> vec = {1, 2, 3, 4, 5};
int even_count = std::count_if(vec.begin(), vec.end(), is_even);
```

#### Pattern 2: Mutable Lambda (Modify Captured Copies)

**The Problem:** Captured-by-value variables are const by default.

```cpp
int count = 0;

// ❌ This won't compile:
auto bad_counter = [count]() { return ++count; };  // Error: can't modify const

// ✅ Add 'mutable' keyword:
auto counter = [count]() mutable { return ++count; };

std::cout << counter();  // 1 - increments the COPY
std::cout << counter();  // 2 - increments the COPY again
std::cout << count;      // Still 0! Original unchanged

// Use case: stateful generators
auto fibonacci = [a = 0, b = 1]() mutable {
    int result = a;
    int next = a + b;
    a = b;
    b = next;
    return result;
};

std::cout << fibonacci();  // 0
std::cout << fibonacci();  // 1
std::cout << fibonacci();  // 1
std::cout << fibonacci();  // 2
std::cout << fibonacci();  // 3
```

**When to use mutable:**

- Creating generators with internal state
- Counters or accumulators where you want a separate state
- When you need to modify a capture but don't want to affect the original

#### Pattern 3: Generic Lambda (C++14)

**What:** Lambdas with `auto` parameters - they're templates!

```cpp
// Generic lambda - works with ANY type
auto print = [](const auto& x) { std::cout << x << '\n'; };

print(42);           // Instantiates with int
print(3.14);         // Instantiates with double
print("hello");      // Instantiates with const char*
print(std::string{"world"});  // Instantiates with std::string

// Useful for generic algorithms
auto pair_sum = [](const auto& p) { return p.first + p.second; };
std::pair<int, int> p1{1, 2};
std::pair<double, double> p2{1.5, 2.5};
std::cout << pair_sum(p1);  // 3
std::cout << pair_sum(p2);  // 4.0

// Multiple auto parameters
auto add = [](auto a, auto b) { return a + b; };
std::cout << add(1, 2);      // 3 (int + int)
std::cout << add(1.5, 2.5);  // 4.0 (double + double)
std::cout << add(std::string{"Hello"}, std::string{" World"});  // "Hello World"
```

**Real use case: Visiting variants**
```cpp
std::variant<int, double, std::string> v = 42;

std::visit([](const auto& val) {
    std::cout << "Value: " << val << '\n';
}, v);  // Works with any type in the variant!
```

#### Pattern 4: Init Capture (C++14) - Moving into Lambdas

**The Problem:** How do you move a unique_ptr or other non-copyable type into a lambda?

```cpp
// OLD (C++11): Workaround with shared_ptr
auto ptr = std::make_shared<int>(42);  // Copyable but not ideal
auto f1 = [ptr]() { return *ptr; };

// NEW (C++14): Init capture with move
auto unique_ptr = std::make_unique<int>(42);
auto f2 = [p = std::move(unique_ptr)]() { return *p; };
//         ^^^^^^^^^^^^^^^^^^^^^^^ Initialize capture with expression
// unique_ptr is now null, ownership moved into lambda

std::cout << f2();  // 42
// unique_ptr is now empty!

// More examples:
auto vec = std::make_unique<std::vector<int>>();
vec->push_back(1);
vec->push_back(2);

auto process = [data = std::move(vec)]() {
    return std::accumulate(data->begin(), data->end(), 0);
};
std::cout << process();  // 3

// Can also create new captures:
auto f3 = [x = 5]() { return x * 2; };  // x is a new variable, not capturing anything
std::cout << f3();  // 10
```

**When to use init capture:**

- Moving unique_ptr or other non-copyable types into lambdas
- Creating thread-local copies: `[data = make_copy(large_data)]`
- Renaming captures: `[count = counter.value]`

---

## Part 7: Decision Guide - Choosing the Right Callable

**"Which tool should I use?"** - Here's a practical guide:

### Quick Decision Tree

```
What do you need?

📌 SIMPLE, one-time function?
   └─ Use lambda directly (99% of cases)
      auto f = [](int x) { return x * 2; };
      std::transform(vec.begin(), vec.end(), result.begin(), f);

📌 NEED TO STORE different callable types?
   └─ Use std::function
      std::function<int(int)> f;
      f = [](int x) { return x * 2; };  // Lambda
      f = &some_function;               // Function pointer
      f = Functor{};                    // Function object

📌 REUSABLE logic across codebase?
   ├─ Simple? → Lambda assigned to constexpr variable
   │  constexpr auto is_positive = [](int x) { return x > 0; };
   └─ Complex? → Regular function
      bool is_valid(const Data& d) { /* complex logic */ }

📌 PARTIAL function application (fixing some arguments)?
   ├─ Modern (C++11+) → Use lambda with capture
   │  int offset = 5;
   │  auto add_offset = [offset](int x) { return x + offset; };
   └─ Legacy → std::bind (avoid if possible)

📌 MEMBER function call?
   ├─ Simple/one-time → Lambda (preferred)
   │  std::transform(objs.begin(), objs.end(), result.begin(),
   │                 [](const Obj& o) { return o.getValue(); });
   └─ Need reusable function object → std::mem_fn
      auto get_value = std::mem_fn(&Obj::getValue);

📌 PRE-BUILT operation (like addition)?
   ├─ With algorithms → Use STL functors
   │  std::transform(v1.begin(), v1.end(), v2.begin(), result.begin(),
   │                 std::plus<>());
   └─ Anywhere else → Just write the lambda
      [](int a, int b) { return a + b; }
```

### Detailed Recommendations by Scenario

#### ✅ Use Lambdas When:

- **Passing to algorithms** (95% of use cases)
```cpp
std::sort(vec.begin(), vec.end(), [](int a, int b) { return a > b; });
```

- **Need local context** (capturing variables)
```cpp
int threshold = 100;
auto high_values = std::count_if(vec.begin(), vec.end(),
                                 [threshold](int x) { return x > threshold; });
```

- **Callback with state**
```cpp
int clicks = 0;
button.onClick([&clicks]() { std::cout << "Clicked " << ++clicks << " times\n"; });
```

#### ✅ Use std::function When:

- **Type erasure needed** (storing different callable types)
```cpp
std::vector<std::function<void()>> tasks;
tasks.push_back([]() { std::cout << "Task 1\n"; });
tasks.push_back(&regular_function);
tasks.push_back(FunctorObject{});
```

- **Callback systems with dynamic binding**
```cpp
class Button {
    std::function<void()> onClick;
public:
    void setClickHandler(std::function<void()> handler) { onClick = handler; }
};
```

- **Runtime polymorphism for callables**

#### ✅ Use STL Function Objects When:

- **Template parameters for containers**
```cpp
std::map<std::string, int, std::greater<>> reverse_map;  // Reverse ordering
std::priority_queue<int, std::vector<int>, std::greater<>> min_heap;
```

- **Standard operations with transform**
```cpp
std::transform(v1.begin(), v1.end(), v2.begin(), result.begin(), std::plus<>());
```

#### ❌ Avoid std::bind:

Lambdas are **always** clearer:

```cpp
// ❌ Hard to read
auto f = std::bind(func, 10, std::placeholders::_1, std::placeholders::_2);

// ✅ Clear and obvious
auto f = [](int a, int b) { return func(10, a, b); };
```

---

## Part 8: Real-World Applications

### Scenario 1: Event System with Callbacks

**Use Case:** GUI frameworks, game engines, observer pattern

**The Challenge:** You need to let different parts of your code "listen" to events without tight coupling.

```cpp
#include <functional>
#include <vector>
#include <iostream>

class EventManager {
    std::vector<std::function<void(int)>> listeners;

public:
    // Accept any callable with signature void(int)
    void subscribe(std::function<void(int)> callback) {
        listeners.push_back(callback);
    }

    void notify(int value) {
        for (auto& listener : listeners) {
            listener(value);
        }
    }
};

int main() {
    EventManager mgr;

    // Listener 1: Simple lambda
    mgr.subscribe([](int x) { 
        std::cout << "Listener 1: " << x << '\n'; 
    });

    // Listener 2: Capturing lambda (has state)
    int multiplier = 2;
    mgr.subscribe([multiplier](int x) { 
        std::cout << "Listener 2: " << (x * multiplier) << '\n'; 
    });

    // Listener 3: Conditional logic
    mgr.subscribe([](int x) {
        if (x > 100) std::cout << "High value alert!\n";
    });

    mgr.notify(50);   // All listeners called
    // Output:
    // Listener 1: 50
    // Listener 2: 100

    mgr.notify(150);  // Triggers alert
    // Output:
    // Listener 1: 150
    // Listener 2: 300
    // High value alert!

    return 0;
}
```

**Key Lessons:**

- `std::function` enables type erasure - different lambdas, same container
- Captures let each listener have its own state
- Pattern commonly used in: UI frameworks, game event systems, pub/sub models

### Scenario 2: Custom Sorting and Filtering

**Use Case:** Working with complex data structures that need multi-criteria sorting

**The Challenge:** Sort people by age, then salary (descending), then name

```cpp
#include <algorithm>
#include <vector>
#include <string>
#include <iostream>

struct Person {
    std::string name;
    int age;
    double salary;
};

int main() {
    std::vector<Person> people = {
        {"Alice", 30, 50000},
        {"Bob", 25, 60000},
        {"Charlie", 30, 55000},
        {"Diana", 25, 60000}
    };

    // Multi-criteria sort with lambda
    // Returns true if 'a' should come before 'b'
    std::sort(people.begin(), people.end(),
        [](const Person& a, const Person& b) {
            // Primary: age ascending
            if (a.age != b.age) return a.age < b.age;
            // Secondary: salary descending (higher salaries first)
            if (a.salary != b.salary) return a.salary > b.salary;
            // Tertiary: name ascending (alphabetical)
            return a.name < b.name;
        });

    std::cout << "Sorted people:\n";
    for (const auto& p : people) {
        std::cout << p.name << ", age " << p.age << ", $" << p.salary << '\n';
    }
    // Output:
    // Bob, age 25, $60000
    // Diana, age 25, $60000
    // Charlie, age 30, $55000
    // Alice, age 30, $50000

    // Filter high earners with init capture
    std::vector<Person> high_earners;
    std::copy_if(people.begin(), people.end(), 
        std::back_inserter(high_earners),
        [threshold = 55000.0](const Person& p) {  // Init capture for clarity
            return p.salary >= threshold; 
        });

    std::cout << "\nHigh earners (>=$55k): " << high_earners.size() << " people\n";

    return 0;
}
```

**Key Lessons:**

- Lambdas make complex sorting logic readable and inline
- Multi-criteria sorting: check each criterion, return early if different
- Init capture (`[threshold = 55000.0]`) makes magic numbers explicit

### Scenario 3: State Machine with std::function

**Use Case:** Game states, protocol handlers, workflow management

**The Challenge:** Model state transitions with dynamic behavior

```cpp
#include <functional>
#include <map>
#include <iostream>

enum class State { Idle, Running, Paused, Stopped };
enum class Event { Start, Pause, Resume, Stop };

class StateMachine {
    State current = State::Idle;
    using Transition = std::function<State(State)>;
    std::map<std::pair<State, Event>, Transition> transitions;

public:
    StateMachine() {
        // Define transitions as lambdas with behavior
        // Pattern: {current_state, event} -> lambda that returns new_state

        transitions[{State::Idle, Event::Start}] = 
            [](State) { 
                std::cout << "Starting...\n"; 
                return State::Running; 
            };

        transitions[{State::Running, Event::Pause}] = 
            [](State) { 
                std::cout << "Pausing...\n"; 
                return State::Paused; 
            };

        transitions[{State::Paused, Event::Resume}] = 
            [](State) { 
                std::cout << "Resuming...\n"; 
                return State::Running; 
            };

        transitions[{State::Running, Event::Stop}] = 
            [](State) { 
                std::cout << "Stopping...\n"; 
                return State::Stopped; 
            };
    }

    void handleEvent(Event e) {
        auto key = std::make_pair(current, e);
        if (transitions.count(key)) {
            current = transitions[key](current);
        } else {
            std::cout << "Invalid transition!\n";
        }
    }

    State getState() const { return current; }
};

int main() {
    StateMachine sm;

    sm.handleEvent(Event::Start);   // Starting... -> Running
    sm.handleEvent(Event::Pause);   // Pausing... -> Paused
    sm.handleEvent(Event::Resume);  // Resuming... -> Running
    sm.handleEvent(Event::Pause);   // Invalid! (can't pause from Running... wait, yes we can)
    sm.handleEvent(Event::Stop);    // Stopping... -> Stopped

    return 0;
}
```

**Key Lessons:**

- `std::function` stores transition behaviors dynamically
- Map of (state, event) → transition makes logic clear
- Each transition is a lambda with custom behavior
- Pattern useful for: game states, network protocols, UI navigation

### Scenario 4: Algorithm Customization with Predicates

**Use Case:** Data processing pipelines, validation systems

**The Challenge:** Apply multiple filters and transformations to data

```cpp
#include <vector>
#include <algorithm>
#include <numeric>
#include <iostream>

struct Product {
    std::string name;
    double price;
    int quantity;
    std::string category;
};

int main() {
    std::vector<Product> inventory = {
        {"Laptop", 999.99, 5, "Electronics"},
        {"Mouse", 25.50, 100, "Electronics"},
        {"Desk", 299.00, 10, "Furniture"},
        {"Chair", 150.00, 20, "Furniture"},
        {"Monitor", 350.00, 8, "Electronics"}
    };

    // Count electronics
    auto electronics_count = std::count_if(inventory.begin(), inventory.end(),
        [](const Product& p) { return p.category == "Electronics"; });
    std::cout << "Electronics: " << electronics_count << '\n';  // 3

    // Calculate total value of inventory
    double total_value = std::accumulate(inventory.begin(), inventory.end(), 0.0,
        [](double sum, const Product& p) {
            return sum + (p.price * p.quantity);
        });
    std::cout << "Total inventory value: $" << total_value << '\n';

    // Find most expensive item
    auto most_expensive = std::max_element(inventory.begin(), inventory.end(),
        [](const Product& a, const Product& b) {
            return a.price < b.price;
        });
    std::cout << "Most expensive: " << most_expensive->name 
              << " at $" << most_expensive->price << '\n';

    // Extract names of low-stock items (quantity < 10)
    std::vector<std::string> low_stock;
    std::transform(inventory.begin(), inventory.end(),
        std::back_inserter(low_stock),
        [](const Product& p) { return p.name; });
    low_stock.erase(
        std::remove_if(low_stock.begin(), low_stock.end(),
            [&inventory](const std::string& name) {
                auto it = std::find_if(inventory.begin(), inventory.end(),
                    [&name](const Product& p) { return p.name == name && p.quantity >= 10; });
                return it != inventory.end();
            }),
        low_stock.end());

    // Better approach for filtering:
    std::vector<Product> needs_restock;
    std::copy_if(inventory.begin(), inventory.end(),
        std::back_inserter(needs_restock),
        [threshold = 10](const Product& p) { return p.quantity < threshold; });

    std::cout << "Items needing restock: ";
    for (const auto& p : needs_restock) {
        std::cout << p.name << " (" << p.quantity << ") ";
    }
    std::cout << '\n';

    return 0;
}
```

**Key Lessons:**

- Lambdas adapt algorithms to your data structures
- `std::accumulate` with lambda performs custom aggregations
- Chaining algorithms with lambdas creates pipelines
- Capture makes thresholds/parameters clear

### Scenario 5: Lazy Evaluation with Stored Lambdas

**Use Case:** Configuration systems, deferred computation

**The Challenge:** Define computations now, execute them later

```cpp
#include <functional>
#include <vector>
#include <iostream>
#include <chrono>
#include <thread>

class TaskScheduler {
    std::vector<std::function<void()>> tasks;

public:
    void addTask(std::function<void()> task) {
        tasks.push_back(task);
    }

    void executeAll() {
        for (auto& task : tasks) {
            task();  // Execute when ready
        }
        tasks.clear();
    }
};

int main() {
    TaskScheduler scheduler;

    // Define tasks with captured state
    int counter = 0;

    scheduler.addTask([&counter]() {
        std::cout << "Task 1: Counter is " << counter << '\n';
        counter += 10;
    });

    scheduler.addTask([&counter]() {
        std::cout << "Task 2: Counter is " << counter << '\n';
        counter *= 2;
    });

    scheduler.addTask([&counter]() {
        std::cout << "Task 3: Final counter is " << counter << '\n';
    });

    std::cout << "Tasks defined but not executed yet.\n";
    std::cout << "Counter is still: " << counter << '\n';  // 0

    // Execute all tasks
    scheduler.executeAll();
    // Output:
    // Task 1: Counter is 0
    // Task 2: Counter is 10
    // Task 3: Final counter is 20

    std::cout << "After execution, counter is: " << counter << '\n';  // 20

    return 0;
}
```

**Key Lessons:**

- Lambdas enable lazy evaluation - define now, run later
- Capture by reference keeps tasks connected to live data
- Useful for: command patterns, undo/redo, job queues

#### Scenario 4: Lazy Evaluation with std::function

```cpp
#include <functional>
#include <iostream>
#include <cmath>

class LazyValue {
    std::function<double()> computation;
    mutable double cached_value = 0;
    mutable bool computed = false;

public:
    LazyValue(std::function<double()> comp) : computation(comp) {}

    double get() const {
        if (!computed) {
            cached_value = computation();
            computed = true;
        }
        return cached_value;
    }
};

int main() {
    // Expensive computation only happens when needed
    LazyValue expensive([](){ 
        std::cout << "Computing...\n";
        return std::sqrt(12345.6789);
    });

    // Not computed yet
    std::cout << "Created lazy value\n";

    // First access - triggers computation
    std::cout << expensive.get() << '\n';

    // Second access - uses cached value
    std::cout << expensive.get() << '\n';

    return 0;
}
```

### Common Mistakes and Solutions

#### Mistake 1: Dangling References in Captures

```cpp
std::function<int()> create_function() {
    int local = 42;

    // ❌ DANGER - captures reference to local variable!
    return [&local]() { return local; };
    // local is destroyed when function returns!
}

// ✅ CORRECT - capture by value
std::function<int()> create_function() {
    int local = 42;
    return [local]() { return local; };
    // Copy of local stored in lambda
}
```

#### Mistake 2: Forgetting mutable for Modifying Captures

```cpp
int count = 0;

// ❌ WRONG - trying to modify const capture
auto bad = [count]() { count++; };  // Compile error!

// ✅ CORRECT - mutable lambda
auto good = [count]() mutable { return ++count; };

// Note: Modifies copy, not original
std::cout << good();  // 1
std::cout << good();  // 2
std::cout << count;   // Still 0
```

#### Mistake 3: Using std::bind When Lambda is Clearer

```cpp
void process(int x, int y, int z) {
    std::cout << x + y + z << '\n';
}

// ❌ UGLY - std::bind with placeholders
auto f1 = std::bind(process, 10, std::placeholders::_1, std::placeholders::_2);
f1(20, 30);  // Calls process(10, 20, 30)

// ✅ CLEAR - lambda
auto f2 = [](int y, int z) { process(10, y, z); };
f2(20, 30);  // Much clearer intent

// Lambda advantages:
// - More readable
// - Better optimization
// - Easier debugging
// - Type-safe
```

#### Mistake 4: Unnecessary std::function Overhead

```cpp
// ❌ SLOW - unnecessary type erasure
void process_vector(const std::vector<int>& vec, 
                   std::function<bool(int)> pred) {
    // Type erasure overhead on every call
}

// ✅ FAST - template with auto deduction
template<typename Pred>
void process_vector(const std::vector<int>& vec, Pred pred) {
    // Can inline the predicate!
}

// Or C++20 concepts:
void process_vector(const std::vector<int>& vec, 
                   auto pred) {
    // Same performance, cleaner syntax
}
```

### Lambda Performance Analysis

**Zero-Cost Abstraction:**

```cpp
// These compile to identical machine code:

// Manual loop
int sum1 = 0;
for (const auto& x : vec) {
    if (x % 2 == 0) sum1 += x;
}

// Lambda with algorithm
int sum2 = 0;
std::for_each(vec.begin(), vec.end(), 
    [&sum2](int x) { if (x % 2 == 0) sum2 += x; });

// Both optimize to the same assembly!
```

**When Performance Matters:**

```cpp
// ✅ FAST - Lambda inlined
std::sort(vec.begin(), vec.end(), 
    [](int a, int b) { return a < b; });

// ⚠️ SLOWER - Virtual call overhead
std::function<bool(int, int)> comp = 
    [](int a, int b) { return a < b; };
std::sort(vec.begin(), vec.end(), comp);

// Performance difference:
// - Lambda: ~0 overhead (inlined)
// - std::function: ~10-100ns per call (virtual dispatch)
```

### Member Function Utilities

**std::mem_fn - Calling Member Functions:**

```cpp
struct Person {
    std::string name;
    int age;

    void print() const {
        std::cout << name << ": " << age << '\n';
    }

    int getAge() const { return age; }
};

std::vector<Person> people = {
    {"Alice", 30},
    {"Bob", 25},
    {"Charlie", 35}
};

// Using std::mem_fn
auto get_age = std::mem_fn(&Person::getAge);
std::vector<int> ages;
std::transform(people.begin(), people.end(), 
              std::back_inserter(ages), get_age);
// ages: {30, 25, 35}

// Modern alternative: lambda (clearer!)
std::transform(people.begin(), people.end(), 
              std::back_inserter(ages),
              [](const Person& p) { return p.getAge(); });
```

**std::reference_wrapper - Storing References:**

```cpp
#include <functional>
#include <vector>
#include <iostream>

int main() {
    int a = 10, b = 20, c = 30;

    // Can't store references directly in vector
    // std::vector<int&> refs;  // Compile error!

    // ✅ Use std::ref to create reference_wrapper
    std::vector<std::reference_wrapper<int>> refs;
    refs.push_back(std::ref(a));
    refs.push_back(std::ref(b));
    refs.push_back(std::ref(c));

    // Modify through references
    for (auto& ref : refs) {
        ref.get() *= 2;
    }

    std::cout << a << " " << b << " " << c;  // 20 40 60

    return 0;
}
```

### Best Practices Summary

**When to Use Each:**

| Feature           | Use When                                     | Avoid When                            |
|-------------------|----------------------------------------------|---------------------------------------|
| Lambda            | Almost always                                | Never!                                |
| std::function     | Need type erasure, store different callables | Performance critical, know exact type |
| std::bind         | Legacy code                                  | New code (use lambda)                 |
| Functors          | Heavy state, reused across files             | Simple one-off operations             |
| Function pointers | C API compatibility                          | Modern C++ code                       |
| std::mem_fn       | Calling member functions in algorithms       | Simple cases (lambda clearer)         |

**Capture Guidelines:**

- ✅ Capture by value `[=]` for small, cheap-to-copy types
- ✅ Capture by reference `[&]` when you need to modify or avoid copies
- ⚠️ Be careful with reference captures - they can dangle!
- ✅ Use init capture `[x = expr]` for move-only types
- ❌ Avoid capturing `this` by reference `[&]` - use `[this]` explicitly

**Performance Guidelines:**

- ✅ Use lambdas directly in algorithms (inlined)
- ⚠️ Use `std::function` only when necessary (virtual call overhead)
- ✅ Template parameters preserve type for optimization
- ✅ Capture by reference to avoid copies of large objects
- ❌ Don't use `std::function` in hot loops if avoidable

---

## Part 9: Summary and Study Guide

### What You've Learned

**Foundation Concepts:**
1. **Callables** - Functions, function pointers, lambdas, and functors are all "things you can call"
2. **Type Erasure** - `std::function` hides callable type differences behind a uniform interface
3. **Partial Application** - Fixing some arguments to create new functions
4. **Captures** - How lambdas access variables from their surrounding scope

**Modern Tools (Use These!):**

- ✅ **Lambdas** - Your primary tool for custom behavior (99% of cases)
- ✅ **std::function** - When you need to store different callable types together
- ✅ **std::not_fn** - Negate predicates cleanly (C++17+)
- ✅ **std::ref/cref** - Pass references through copy-heavy APIs

**Legacy Tools (Know But Avoid):**

- ⚠️ **std::bind** - Superseded by lambdas (harder to read, less optimized)
- ⚠️ **std::mem_fn** - Usually clearer with lambdas
- ❌ **bind1st/bind2nd, not1/not2** - Deprecated and removed (C++17)

**Standard Function Objects:**

- Arithmetic: `plus<>`, `minus<>`, `multiplies<>`, `divides<>`, `modulus<>`, `negate<>`
- Comparison: `equal_to<>`, `not_equal_to<>`, `greater<>`, `less<>`, `greater_equal<>`, `less_equal<>`
- Logic: `logical_and<>`, `logical_or<>`, `logical_not<>`

### Quick Reference Card

**Lambda Syntax:**
```cpp
[capture](parameters) -> return_type { body }
```

**Capture Modes:**
```cpp
[]         // Capture nothing
[=]        // Capture all by value (copy)
[&]        // Capture all by reference
[x]        // Capture x by value
[&x]       // Capture x by reference
[=, &x]    // All by value except x by reference
[&, x]     // All by reference except x by value
[x=expr]   // Init capture (C++14)
```

**Common Patterns:**
```cpp
// Stateless (convertible to function pointer)
[](int x) { return x * 2; }

// Mutable (modify captured copy)
[count]() mutable { return ++count; }

// Generic (C++14)
[](const auto& x) { return x.size(); }

// Init capture (C++14)
[ptr = std::move(unique_ptr)]() { return *ptr; }
```

### Decision Flowchart for Exam Questions

**"Which tool should I use?"**

```
Question asks about...

┌─ Passing custom logic to algorithm?
│  └─ Use LAMBDA
│     Example: std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; })
│
┌─ Storing different callable types together?
│  └─ Use std::function
│     Example: std::vector<std::function<void()>> callbacks;
│
┌─ Pre-built operation (addition, comparison)?
│  └─ Use STL function object
│     Example: std::sort(v.begin(), v.end(), std::greater<>());
│
┌─ Passing reference through API that copies?
│  └─ Use std::ref / std::cref
│     Example: std::thread(func, std::ref(data));
│
┌─ Negating a predicate?
│  └─ Use std::not_fn (C++17) or lambda
│     Example: std::not_fn(is_even) or [](int x) { return !is_even(x); }
│
└─ Code uses bind1st/not1/mem_fun_ref?
   └─ DEPRECATED - recognize them but know modern alternatives
      Old: bind1st(greater<>(), 5)
      New: [](int x) { return 5 > x; }
```

### Common Exam Traps

**Trap 1: Capture vs. No Capture**
```cpp
// ❌ This won't compile
int threshold = 10;
auto f = [](int x) { return x > threshold; };  // Error: threshold not captured!

// ✅ Correct
auto f = [threshold](int x) { return x > threshold; };
```

**Trap 2: Mutable Captures**
```cpp
int count = 0;
auto f = [count]() { return ++count; };  // ❌ Error: count is const!
auto g = [count]() mutable { return ++count; };  // ✅ Works
```

**Trap 3: Dangling References**
```cpp
std::function<int()> bad() {
    int x = 42;
    return [&x]() { return x; };  // ❌ x destroyed!
}
```

**Trap 4: std::function Performance**
```cpp
// In performance-critical code:
void func(std::function<bool(int)> pred);  // ❌ Overhead
template<typename Pred>
void func(Pred pred);  // ✅ Can inline
```

### Practice Questions

**Question 1:** What does this lambda capture?
```cpp
int a = 5, b = 10;
auto f = [=, &b](int x) { return x + a + b; };
```
<details>
<summary>Answer</summary>
`a` by value (copy), `b` by reference. `a` is const inside lambda, `b` can be modified.
</details>

**Question 2:** Why won't this compile?
```cpp
auto f = [count = 0]() { return ++count; };
```
<details>
<summary>Answer</summary>
Captured values are const by default. Need `mutable`: `[count = 0]() mutable { return ++count; }`
</details>

**Question 3:** What's the modern equivalent?
```cpp
std::bind1st(std::greater<int>(), 10)
```
<details>
<summary>Answer</summary>
```cpp
[](int x) { return 10 > x; }  // or
[](int x) { return x < 10; }  // (logical equivalent)
```
</details>

**Question 4:** When should you use `std::function` over a lambda?
<details>
<summary>Answer</summary>
When you need to store different callable types in the same container or variable, or when you need runtime polymorphism for callables. For simple algorithm parameters, direct lambdas are better.
</details>

### Study Tips for Exams

1. **Know the lambda capture modes cold** - `[=]`, `[&]`, `[x]`, `[&x]`, `[=, &x]`, `[&, x]`
2. **Recognize deprecated utilities** - `bind1st`, `not1`, `mem_fun_ref` - but know modern replacements
3. **Understand when std::function is needed** - type erasure, not for every lambda use
4. **Know the standard function objects** - especially `std::greater<>` for reverse sorting
5. **Remember mutable keyword** - for modifying captured-by-value variables
6. **Understand std::ref** - for passing references through copy APIs (threads, bind, etc.)

### What's Next?

Now that you understand functional programming in C++, you can:
- Write cleaner, more expressive algorithm code
- Create flexible callback systems
- Build complex data processing pipelines
- Understand and modernize legacy codebases

**Next Module:** We'll explore advanced I/O operations, including streams, formatting, and file handling.

---

## Key Takeaways

✅ **Lambdas are your primary tool** - use them for almost everything
✅ **std::function** - when you need type erasure for different callables
✅ **std::bind** - deprecated in favor of lambdas (know for legacy code)
✅ **std::mem_fn** - wraps member functions (lambdas often clearer)
✅ **std::ref/cref** - pass references through value-copying APIs
✅ **std::not_fn** - negate predicates cleanly (C++17+)
✅ **Deprecated utilities** - `bind1st`, `not1`, `mem_fun` - know them for exams!

**Remember:** Modern C++ favors lambdas for their clarity, performance, and flexibility. When in doubt, reach for a lambda first!

---

[← Previous: Module 6](./module-6-merge-heap-algorithms.md) | [Back to Index](./README.md) | [Next: Module 8 →](./module-8-advanced-io.md)

