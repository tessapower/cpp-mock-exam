# Module 5: Sorting and Binary Search

## Overview

Sorting algorithms and binary search operations for efficient data manipulation.

📖 [cppreference: Sorting operations](https://en.cppreference.com/w/cpp/algorithm)

---

## Sorting Algorithms

### std::sort
**Unstable sort - O(n log n) average**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {3, 1, 4, 1, 5, 9, 2, 6};
    
    // Sort ascending
    std::sort(vec.begin(), vec.end());
    // vec: {1, 1, 2, 3, 4, 5, 6, 9}
    
    // Sort descending
    std::sort(vec.begin(), vec.end(), std::greater<int>());
    // vec: {9, 6, 5, 4, 3, 2, 1, 1}
    
    // Custom comparator
    std::vector<std::string> words = {"apple", "pie", "zoo", "a"};
    std::sort(words.begin(), words.end(),
              [](const std::string& a, const std::string& b) {
                  return a.length() < b.length();
              });
    // words: {"a", "pie", "zoo", "apple"}
    
    return 0;
}
```

📖 [cppreference: std::sort](https://en.cppreference.com/w/cpp/algorithm/sort)

### std::stable_sort
**Stable sort - preserves relative order of equal elements**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

struct Person {
    std::string name;
    int age;
};

int main() {
    std::vector<Person> people = {
        {"Alice", 30}, {"Bob", 25}, {"Charlie", 30}, {"David", 25}
    };
    
    // Stable sort by age - relative order preserved for same age
    std::stable_sort(people.begin(), people.end(),
                     [](const Person& a, const Person& b) {
                         return a.age < b.age;
                     });
    // Result: Bob(25), David(25), Alice(30), Charlie(30)
    // Bob before David, Alice before Charlie (original order preserved)
    
    return 0;
}
```

📖 [cppreference: std::stable_sort](https://en.cppreference.com/w/cpp/algorithm/stable_sort)

### std::partial_sort
**Sort first n elements**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {9, 8, 7, 6, 5, 4, 3, 2, 1};
    
    // Sort only first 3 elements
    std::partial_sort(vec.begin(), vec.begin() + 3, vec.end());
    // vec: {1, 2, 3, ?, ?, ?, ?, ?, ?} - rest unspecified order
    
    for (int i = 0; i < 3; ++i) {
        std::cout << vec[i] << ' ';  // 1 2 3
    }
    
    return 0;
}
```

📖 [cppreference: std::partial_sort](https://en.cppreference.com/w/cpp/algorithm/partial_sort)

### std::nth_element
**Partition around nth element - O(n) average**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};
    
    // Place 5th element (median) in correct position
    std::nth_element(vec.begin(), vec.begin() + 5, vec.end());
    
    std::cout << "Median: " << vec[5] << '\n';  // Element that would be at index 5 if sorted
    // Elements before index 5 are <= vec[5]
    // Elements after index 5 are >= vec[5]
    
    return 0;
}
```

📖 [cppreference: std::nth_element](https://en.cppreference.com/w/cpp/algorithm/nth_element)

---

## Binary Search (Requires Sorted Range)

### std::binary_search
**Check if element exists - returns bool**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    
    bool found = std::binary_search(vec.begin(), vec.end(), 5);
    std::cout << std::boolalpha << found << '\n';  // true
    
    bool not_found = std::binary_search(vec.begin(), vec.end(), 10);
    std::cout << not_found << '\n';  // false
    
    return 0;
}
```

📖 [cppreference: std::binary_search](https://en.cppreference.com/w/cpp/algorithm/binary_search)

### std::lower_bound
**First element >= value**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 4, 4, 4, 6, 7};
    
    auto it = std::lower_bound(vec.begin(), vec.end(), 4);
    std::cout << "First >= 4 at index: " << (it - vec.begin()) << '\n';  // 2
    
    // Insert while maintaining sorted order
    vec.insert(std::lower_bound(vec.begin(), vec.end(), 5), 5);
    // vec: {1, 2, 4, 4, 4, 5, 6, 7}
    
    return 0;
}
```

📖 [cppreference: std::lower_bound](https://en.cppreference.com/w/cpp/algorithm/lower_bound)

### std::upper_bound
**First element > value**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 4, 4, 4, 6, 7};
    
    auto it = std::upper_bound(vec.begin(), vec.end(), 4);
    std::cout << "First > 4 at index: " << (it - vec.begin()) << '\n';  // 5
    std::cout << "Value: " << *it << '\n';  // 6
    
    return 0;
}
```

📖 [cppreference: std::upper_bound](https://en.cppreference.com/w/cpp/algorithm/upper_bound)

### std::equal_range
**Returns pair [lower_bound, upper_bound]**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 4, 4, 4, 6, 7};
    
    auto [lower, upper] = std::equal_range(vec.begin(), vec.end(), 4);
    
    std::cout << "Range of 4: [" << (lower - vec.begin()) 
              << ", " << (upper - vec.begin()) << ")\n";  // [2, 5)
    
    std::cout << "Count: " << (upper - lower) << '\n';  // 3
    
    return 0;
}
```

📖 [cppreference: std::equal_range](https://en.cppreference.com/w/cpp/algorithm/equal_range)

---

## Checking Sorted Order

### std::is_sorted / std::is_sorted_until

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec1 = {1, 2, 3, 4, 5};
    std::vector<int> vec2 = {1, 2, 5, 3, 4};
    
    // Check if sorted
    std::cout << std::boolalpha;
    std::cout << std::is_sorted(vec1.begin(), vec1.end()) << '\n';  // true
    std::cout << std::is_sorted(vec2.begin(), vec2.end()) << '\n';  // false
    
    // Find first unsorted element
    auto it = std::is_sorted_until(vec2.begin(), vec2.end());
    std::cout << "Sorted until index: " << (it - vec2.begin()) << '\n';  // 3
    
    return 0;
}
```

📖 [cppreference: std::is_sorted](https://en.cppreference.com/w/cpp/algorithm/is_sorted)

---

## Comparator Requirements

**Strict Weak Ordering:**
1. **Irreflexive**: `comp(x, x)` must be false
2. **Asymmetric**: if `comp(x, y)` then `!comp(y, x)`
3. **Transitive**: if `comp(x, y)` and `comp(y, z)` then `comp(x, z)`
4. **Equivalence**: if `!comp(x, y) && !comp(y, x)` then x ≈ y

```cpp
// CORRECT comparator
auto correct = [](int a, int b) { return a < b; };

// WRONG - not strict weak ordering!
auto wrong = [](int a, int b) { return a <= b; };  // Not asymmetric!
```

---

## Complexity Summary

| Algorithm | Time Complexity | Stable |
|-----------|----------------|--------|
| `std::sort` | O(n log n) | No |
| `std::stable_sort` | O(n log n) | Yes |
| `std::partial_sort` | O(n log k) | No |
| `std::nth_element` | O(n) avg | No |
| Binary search ops | O(log n) | N/A |

---

## Key Takeaways

✅ **sort** is fastest, **stable_sort** preserves order  
✅ **Binary search** requires **sorted** input  
✅ **lower_bound** = first >=, **upper_bound** = first >  
✅ **nth_element** is O(n) for finding kth element  
✅ **Comparators** must satisfy strict weak ordering

---

[← Previous: Module 4](./module-4-modifying-operations.md) | [Back to Index](./README.md) | [Next: Module 6 →](./module-6-merge-heap-algorithms.md)

