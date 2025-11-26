# Module 7: STL Functional Objects and Utilities

## Overview

Function objects, function adapters, and utilities for working with callables in modern C++.

📖 [cppreference: Function objects](https://en.cppreference.com/w/cpp/utility/functional)

---

## Standard Function Objects

### Arithmetic Operations

```cpp
#include <functional>
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v1 = {1, 2, 3, 4};
    std::vector<int> v2 = {10, 20, 30, 40};
    std::vector<int> result(4);
    
    // Using std::plus
    std::transform(v1.begin(), v1.end(), v2.begin(), result.begin(),
                   std::plus<int>());
    // result: {11, 22, 33, 44}
    
    // Available: plus, minus, multiplies, divides, modulus
    std::transform(v1.begin(), v1.end(), v2.begin(), result.begin(),
                   std::multiplies<int>());
    // result: {10, 40, 90, 160}
    
    return 0;
}
```

### Comparison Operations

```cpp
#include <functional>
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {5, 2, 8, 1, 9};
    
    // Sort descending using std::greater
    std::sort(vec.begin(), vec.end(), std::greater<int>());
    // vec: {9, 8, 5, 2, 1}
    
    // Available: equal_to, not_equal_to, greater, less, 
    //            greater_equal, less_equal
    
    return 0;
}
```

📖 [cppreference: Arithmetic operations](https://en.cppreference.com/w/cpp/utility/functional)

---

## Modern C++ Utilities

### std::function
**Type-erased wrapper for any callable**

```cpp
#include <functional>
#include <iostream>

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
    
    // Can store member functions (with std::mem_fn)
    std::string str = "hello";
    std::function<size_t()> f4 = std::bind(&std::string::size, &str);
    std::cout << f4() << '\n';  // 5
    
    return 0;
}
```

📖 [cppreference: std::function](https://en.cppreference.com/w/cpp/utility/functional/function)

### std::bind
**Bind arguments to callable**

```cpp
#include <functional>
#include <iostream>

int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    using namespace std::placeholders;
    
    // Bind first argument to 10
    auto add10 = std::bind(add, 10, _1, _2);
    std::cout << add10(5, 3) << '\n';  // 18 (10 + 5 + 3)
    
    // Reorder arguments
    auto reordered = std::bind(add, _2, _1, _3);
    std::cout << reordered(1, 2, 3) << '\n';  // 6 (2 + 1 + 3)
    
    // Note: Lambdas are often clearer!
    auto lambda_version = [](int b, int c) { return add(10, b, c); };
    
    return 0;
}
```

📖 [cppreference: std::bind](https://en.cppreference.com/w/cpp/utility/functional/bind)

### std::mem_fn
**Wrap member function pointer**

```cpp
#include <functional>
#include <vector>
#include <algorithm>
#include <string>
#include <iostream>

int main() {
    std::vector<std::string> words = {"hello", "world", "cpp"};
    
    // Call size() on each string
    std::transform(words.begin(), words.end(),
                   std::back_inserter(std::vector<size_t>{}),
                   std::mem_fn(&std::string::size));
    
    // Modern alternative: lambda
    std::vector<size_t> lengths;
    std::transform(words.begin(), words.end(),
                   std::back_inserter(lengths),
                   [](const std::string& s) { return s.size(); });
    
    return 0;
}
```

📖 [cppreference: std::mem_fn](https://en.cppreference.com/w/cpp/utility/functional/mem_fn)

### std::not_fn (C++17)
**Negate any callable**

```cpp
#include <functional>
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    
    auto is_even = [](int x) { return x % 2 == 0; };
    
    // Find first odd number (negate is_even)
    auto it = std::find_if(vec.begin(), vec.end(), std::not_fn(is_even));
    std::cout << *it << '\n';  // 1
    
    return 0;
}
```

📖 [cppreference: std::not_fn](https://en.cppreference.com/w/cpp/utility/functional/not_fn)

---

## Reference Wrappers

### std::ref / std::cref

```cpp
#include <functional>
#include <vector>
#include <algorithm>
#include <iostream>

void increment(int& x) { ++x; }

int main() {
    int value = 5;
    
    // Problem: std::bind copies by default
    auto bad = std::bind(increment, value);
    bad();
    std::cout << value << '\n';  // 5 (unchanged!)
    
    // Solution: use std::ref
    auto good = std::bind(increment, std::ref(value));
    good();
    std::cout << value << '\n';  // 6 (changed!)
    
    // Using with containers
    std::vector<std::reference_wrapper<int>> refs;
    int a = 1, b = 2, c = 3;
    refs.push_back(std::ref(a));
    refs.push_back(std::ref(b));
    refs.push_back(std::ref(c));
    
    // Modify through references
    for (auto& ref : refs) {
        ref.get() *= 2;
    }
    std::cout << a << ' ' << b << ' ' << c << '\n';  // 2 4 6
    
    return 0;
}
```

📖 [cppreference: std::ref](https://en.cppreference.com/w/cpp/utility/functional/ref)

---

## Deprecated Utilities (Know for Exam!)

### ⚠️ Deprecated in C++11, Removed in C++17

```cpp
// DON'T USE THESE IN NEW CODE!

// std::bind1st, std::bind2nd - DEPRECATED
// Use std::bind or lambdas instead

// std::ptr_fun - DEPRECATED
// Not needed in modern C++

// std::mem_fun, std::mem_fun_ref - DEPRECATED
// Use std::mem_fn instead

// std::not1, std::not2 - DEPRECATED
// Use std::not_fn instead
```

**Modern Replacements:**

| Deprecated | Modern Alternative |
|------------|-------------------|
| `bind1st/bind2nd` | `std::bind` or lambdas |
| `ptr_fun` | Not needed |
| `mem_fun/mem_fun_ref` | `std::mem_fn` |
| `not1/not2` | `std::not_fn` |

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

## Understanding Lambdas: The Complete Guide

**Lambda Syntax:**

```cpp
[capture](parameters) -> return_type { body }
  ↑        ↑             ↑              ↑
  |        |             |              |
  |        |             |              Function body
  |        |             Return type (often auto-deduced)
  |        Parameters
  Capture clause - access to external variables
```

**Capture Modes:**

```cpp
int x = 10, y = 20;

// [=] - Capture all by value (copy)
auto f1 = [=]() { return x + y; };  // x and y copied
// x and y inside are const copies

// [&] - Capture all by reference
auto f2 = [&]() { x++; y++; };  // Can modify x and y

// [x] - Capture x by value
auto f3 = [x]() { return x * 2; };

// [&x] - Capture x by reference  
auto f4 = [&x]() { x *= 2; };

// [=, &x] - Capture all by value except x by reference
auto f5 = [=, &x]() { x = y; };

// [&, x] - Capture all by reference except x by value
auto f6 = [&, x]() { y = x; };

// [this] - Capture this pointer in member function
// [*this] - Capture object by value (C++17)
```

**Common Patterns:**

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};

// Pattern 1: Stateless lambda (can convert to function pointer)
auto is_even = [](int x) { return x % 2 == 0; };

// Pattern 2: Mutable lambda (modify captured value copies)
int count = 0;
auto counter = [count]() mutable { return ++count; };
std::cout << counter();  // 1
std::cout << counter();  // 2
std::cout << count;      // Still 0! Modified copy

// Pattern 3: Generic lambda (C++14)
auto print = [](const auto& x) { std::cout << x << '\n'; };
print(42);       // Works with int
print("hello");  // Works with string

// Pattern 4: Init capture (C++14)
auto ptr = std::make_unique<int>(42);
auto f = [p = std::move(ptr)]() { return *p; };
// ptr is now null, ownership moved into lambda
```

## Decision Guide: Choosing the Right Callable

### Decision Tree

```
What do you need?

SIMPLE, one-time function
└─ Use lambda directly
   auto f = [](int x) { return x * 2; };

NEED TO STORE different callable types
└─ Use std::function
   std::function<int(int)> f;
   f = [](int x) { return x * 2; };
   f = &some_function;

REUSABLE logic across codebase
├─ Simple? → Lambda in common header
└─ Complex? → Regular function

PARTIAL function application (binding arguments)
├─ Modern (C++11+) → Use lambda with capture
│  auto add5 = [](int x) { return x + 5; };
└─ Legacy → std::bind (avoid if possible)

MEMBER function call
├─ Simple → Lambda
│  [obj](int x) { return obj.method(x); }
└─ Need function object → std::mem_fn
   auto f = std::mem_fn(&Class::method);
```

### Real-World Scenarios

#### Scenario 1: Event System with Callbacks

```cpp
#include <functional>
#include <vector>
#include <iostream>

class EventManager {
    std::vector<std::function<void(int)>> listeners;
    
public:
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
    
    // Subscribe with lambda
    mgr.subscribe([](int x) { 
        std::cout << "Listener 1: " << x << '\n'; 
    });
    
    // Subscribe with capturing lambda
    int multiplier = 2;
    mgr.subscribe([multiplier](int x) { 
        std::cout << "Listener 2: " << (x * multiplier) << '\n'; 
    });
    
    // Subscribe with named function
    mgr.subscribe([](int x) {
        if (x > 100) std::cout << "High value alert!\n";
    });
    
    mgr.notify(50);   // All listeners called
    mgr.notify(150);  // Triggers alert
    
    return 0;
}
```

#### Scenario 2: Custom Sorting Logic

```cpp
struct Person {
    std::string name;
    int age;
    double salary;
};

std::vector<Person> people = {
    {"Alice", 30, 50000},
    {"Bob", 25, 60000},
    {"Charlie", 30, 55000}
};

// Sort by age, then by salary (descending), then by name
std::sort(people.begin(), people.end(),
    [](const Person& a, const Person& b) {
        if (a.age != b.age) return a.age < b.age;
        if (a.salary != b.salary) return a.salary > b.salary;
        return a.name < b.name;
    });

// Filter high earners
std::vector<Person> high_earners;
std::copy_if(people.begin(), people.end(), 
    std::back_inserter(high_earners),
    [threshold = 55000.0](const Person& p) { 
        return p.salary >= threshold; 
    });
```

#### Scenario 3: State Machine with std::function

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
        // Define transitions
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
};
```

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

| Feature | Use When | Avoid When |
|---------|----------|------------|
| Lambda | Almost always | Never! |
| std::function | Need type erasure, store different callables | Performance critical, know exact type |
| std::bind | Legacy code | New code (use lambda) |
| Functors | Heavy state, reused across files | Simple one-off operations |
| Function pointers | C API compatibility | Modern C++ code |
| std::mem_fn | Calling member functions in algorithms | Simple cases (lambda clearer) |

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

## Key Takeaways

✅ **std::function** - type-erased callable wrapper  
✅ **std::bind** - bind arguments, but **lambdas often better**  
✅ **std::mem_fn** - wrap member functions  
✅ **std::ref/cref** - pass references through value-copying APIs  
✅ **std::not_fn** - negate predicates (C++17+)  
✅ **Deprecated utilities** - know them for the exam, don't use them!

---

[← Previous: Module 6](./module-6-merge-heap-algorithms.md) | [Back to Index](./README.md) | [Next: Module 8 →](./module-8-advanced-io.md)

