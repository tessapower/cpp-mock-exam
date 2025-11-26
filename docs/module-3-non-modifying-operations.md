# Module 3: Non-Modifying Sequence Operations

## Overview

Non-modifying algorithms inspect and analyze container elements without changing them.

📖 [cppreference: Algorithm library](https://en.cppreference.com/w/cpp/algorithm)

---

## Key Algorithms

### Searching Algorithms

#### std::find
**Find first occurrence of a value**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    
    auto it = std::find(vec.begin(), vec.end(), 3);
    if (it != vec.end()) {
        std::cout << "Found at index: " << (it - vec.begin()) << '\n';  // 2
    }
    
    return 0;
}
```

- 📖 [cppreference: std::find](https://en.cppreference.com/w/cpp/algorithm/find)

#### std::find_if / std::find_if_not
**Find element matching predicate**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 3, 5, 6, 7};
    
    // Find first even number
    auto it = std::find_if(vec.begin(), vec.end(), 
                           [](int x) { return x % 2 == 0; });
    
    if (it != vec.end()) {
        std::cout << "First even: " << *it << '\n';  // 6
    }
    
    // Find first odd number (using find_if_not)
    auto it2 = std::find_if_not(vec.begin(), vec.end(),
                                [](int x) { return x % 2 == 0; });
    std::cout << "First odd: " << *it2 << '\n';  // 1
    
    return 0;
}
```

- 📖 [cppreference: std::find_if](https://en.cppreference.com/w/cpp/algorithm/find)

#### std::find_first_of
**Find any element from a set**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> haystack = {1, 2, 3, 4, 5};
    std::vector<int> needles = {3, 7, 9};
    
    auto it = std::find_first_of(haystack.begin(), haystack.end(),
                                  needles.begin(), needles.end());
    
    if (it != haystack.end()) {
        std::cout << "Found: " << *it << '\n';  // 3
    }
    
    return 0;
}
```

- 📖 [cppreference: std::find_first_of](https://en.cppreference.com/w/cpp/algorithm/find_first_of)

#### std::adjacent_find
**Find consecutive equal elements**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 3, 4, 5};
    
    auto it = std::adjacent_find(vec.begin(), vec.end());
    if (it != vec.end()) {
        std::cout << "First duplicate: " << *it << '\n';  // 3
    }
    
    // With custom predicate: find consecutive elements that differ by 1
    auto it2 = std::adjacent_find(vec.begin(), vec.end(),
                                   [](int a, int b) { return b - a == 1; });
    std::cout << "Found consecutive: " << *it2 << '\n';  // 1
    
    return 0;
}
```

- 📖 [cppreference: std::adjacent_find](https://en.cppreference.com/w/cpp/algorithm/adjacent_find)

#### std::search
**Find subsequence in sequence**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> text = {1, 2, 3, 4, 5, 6};
    std::vector<int> pattern = {3, 4, 5};
    
    auto it = std::search(text.begin(), text.end(),
                          pattern.begin(), pattern.end());
    
    if (it != text.end()) {
        std::cout << "Pattern found at index: " << (it - text.begin()) << '\n';  // 2
    }
    
    return 0;
}
```

- 📖 [cppreference: std::search](https://en.cppreference.com/w/cpp/algorithm/search)

#### std::search_n
**Find n consecutive occurrences**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 3, 3, 4};
    
    // Find 3 consecutive 3's
    auto it = std::search_n(vec.begin(), vec.end(), 3, 3);
    
    if (it != vec.end()) {
        std::cout << "Found at index: " << (it - vec.begin()) << '\n';  // 2
    }
    
    return 0;
}
```

- 📖 [cppreference: std::search_n](https://en.cppreference.com/w/cpp/algorithm/search_n)

---

### Counting Algorithms

#### std::count / std::count_if

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 2, 4, 2, 5};
    
    // Count occurrences of value
    int count = std::count(vec.begin(), vec.end(), 2);
    std::cout << "Count of 2: " << count << '\n';  // 3
    
    // Count elements matching predicate
    int even_count = std::count_if(vec.begin(), vec.end(),
                                   [](int x) { return x % 2 == 0; });
    std::cout << "Even count: " << even_count << '\n';  // 4
    
    return 0;
}
```

- 📖 [cppreference: std::count](https://en.cppreference.com/w/cpp/algorithm/count)

---

### Comparison Algorithms

#### std::equal
**Compare two ranges**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec1 = {1, 2, 3, 4};
    std::vector<int> vec2 = {1, 2, 3, 4};
    std::vector<int> vec3 = {1, 2, 3, 5};
    
    bool eq1 = std::equal(vec1.begin(), vec1.end(), vec2.begin());
    std::cout << std::boolalpha << eq1 << '\n';  // true
    
    bool eq2 = std::equal(vec1.begin(), vec1.end(), vec3.begin());
    std::cout << eq2 << '\n';  // false
    
    // With custom comparator
    bool eq3 = std::equal(vec1.begin(), vec1.end(), vec2.begin(),
                          [](int a, int b) { return std::abs(a) == std::abs(b); });
    
    return 0;
}
```

- 📖 [cppreference: std::equal](https://en.cppreference.com/w/cpp/algorithm/equal)

#### std::mismatch
**Find first difference**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec1 = {1, 2, 3, 4, 5};
    std::vector<int> vec2 = {1, 2, 9, 4, 5};
    
    auto [it1, it2] = std::mismatch(vec1.begin(), vec1.end(),
                                     vec2.begin());
    
    std::cout << "First mismatch at: " << *it1 << " vs " << *it2 << '\n';  // 3 vs 9
    
    return 0;
}
```

- 📖 [cppreference: std::mismatch](https://en.cppreference.com/w/cpp/algorithm/mismatch)

#### std::lexicographical_compare
**Dictionary-style comparison**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec1 = {1, 2, 3};
    std::vector<int> vec2 = {1, 2, 4};
    std::vector<int> vec3 = {1, 2};
    
    bool less1 = std::lexicographical_compare(vec1.begin(), vec1.end(),
                                               vec2.begin(), vec2.end());
    std::cout << std::boolalpha << less1 << '\n';  // true (3 < 4)
    
    bool less2 = std::lexicographical_compare(vec3.begin(), vec3.end(),
                                               vec1.begin(), vec1.end());
    std::cout << less2 << '\n';  // true (shorter is less)
    
    return 0;
}
```

- 📖 [cppreference: std::lexicographical_compare](https://en.cppreference.com/w/cpp/algorithm/lexicographical_compare)

---

### Predicate Checking

#### std::all_of / std::any_of / std::none_of

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {2, 4, 6, 8};
    
    // Check if all elements are even
    bool all_even = std::all_of(vec.begin(), vec.end(),
                                [](int x) { return x % 2 == 0; });
    std::cout << std::boolalpha << "All even: " << all_even << '\n';  // true
    
    // Check if any element is > 5
    bool any_large = std::any_of(vec.begin(), vec.end(),
                                 [](int x) { return x > 5; });
    std::cout << "Any > 5: " << any_large << '\n';  // true
    
    // Check if no element is odd
    bool none_odd = std::none_of(vec.begin(), vec.end(),
                                 [](int x) { return x % 2 == 1; });
    std::cout << "None odd: " << none_odd << '\n';  // true
    
    return 0;
}
```

- 📖 [cppreference: std::all_of](https://en.cppreference.com/w/cpp/algorithm/all_any_none_of)

---

### Iteration Algorithm

#### std::for_each

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    
    // Apply function to each element
    std::for_each(vec.begin(), vec.end(),
                  [](int x) { std::cout << x * 2 << ' '; });
    std::cout << '\n';  // 2 4 6 8 10
    
    // for_each returns the function object
    struct Counter {
        int count = 0;
        void operator()(int) { ++count; }
    };
    
    Counter c = std::for_each(vec.begin(), vec.end(), Counter{});
    std::cout << "Count: " << c.count << '\n';  // 5
    
    return 0;
}
```

- 📖 [cppreference: std::for_each](https://en.cppreference.com/w/cpp/algorithm/for_each)

---

## Algorithm Complexity Summary

| Algorithm | Time Complexity |
|-----------|----------------|
| `find`, `find_if` | O(n) |
| `count`, `count_if` | O(n) |
| `search` | O(n×m) |
| `equal` | O(n) |
| `mismatch` | O(n) |
| `all_of`, `any_of`, `none_of` | O(n) |
| `for_each` | O(n) |

---

## Key Takeaways

✅ All algorithms return **iterators** or **boolean** values, never modify elements  
✅ Use `_if` variants for **predicate-based** operations  
✅ Always check if returned iterator `!= end()` before dereferencing  
✅ `for_each` returns the **function object** (can accumulate state)  
✅ Algorithms work on **iterator ranges**, not containers directly

---

[← Previous: Module 2](./module-2-associative-containers.md) | [Back to Index](./README.md) | [Next: Module 4 →](./module-4-modifying-operations.md)

