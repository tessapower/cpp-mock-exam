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

## Key Takeaways

✅ **std::function** - type-erased callable wrapper  
✅ **std::bind** - bind arguments, but **lambdas often better**  
✅ **std::mem_fn** - wrap member functions  
✅ **std::ref/cref** - pass references through value-copying APIs  
✅ **std::not_fn** - negate predicates (C++17+)  
✅ **Deprecated utilities** - know them for the exam, don't use them!

---

[← Previous: Module 6](./module-6-merge-heap-algorithms.md) | [Back to Index](./README.md) | [Next: Module 8 →](./module-8-advanced-io.md)

