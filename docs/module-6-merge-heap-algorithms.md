# Module 6: Merge, Heap, Min, Max Algorithms

## Overview

Algorithms for merging sorted sequences, heap operations, and finding minimum/maximum elements.

📖 [cppreference: Sorting operations](https://en.cppreference.com/w/cpp/algorithm)

---

## Merge Operations

### std::merge
**Merge two sorted ranges into one sorted output**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v1 = {1, 3, 5, 7};
    std::vector<int> v2 = {2, 4, 6, 8};
    std::vector<int> result(8);
    
    std::merge(v1.begin(), v1.end(),
               v2.begin(), v2.end(),
               result.begin());
    // result: {1, 2, 3, 4, 5, 6, 7, 8}
    
    return 0;
}
```

📖 [cppreference: std::merge](https://en.cppreference.com/w/cpp/algorithm/merge)

### std::inplace_merge
**Merge two consecutive sorted ranges in-place**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 3, 5, 7, 2, 4, 6, 8};
    //                      ^sorted^  ^sorted^
    
    auto middle = vec.begin() + 4;
    std::inplace_merge(vec.begin(), middle, vec.end());
    // vec: {1, 2, 3, 4, 5, 6, 7, 8}
    
    return 0;
}
```

📖 [cppreference: std::inplace_merge](https://en.cppreference.com/w/cpp/algorithm/inplace_merge)

---

## Set Operations (Require Sorted Ranges)

### std::set_union
**Elements in either range**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v1 = {1, 2, 3, 4, 5};
    std::vector<int> v2 = {3, 4, 5, 6, 7};
    std::vector<int> result;
    
    std::set_union(v1.begin(), v1.end(),
                   v2.begin(), v2.end(),
                   std::back_inserter(result));
    // result: {1, 2, 3, 4, 5, 6, 7}
    
    return 0;
}
```

📖 [cppreference: std::set_union](https://en.cppreference.com/w/cpp/algorithm/set_union)

### std::set_intersection
**Elements in both ranges**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v1 = {1, 2, 3, 4, 5};
    std::vector<int> v2 = {3, 4, 5, 6, 7};
    std::vector<int> result;
    
    std::set_intersection(v1.begin(), v1.end(),
                          v2.begin(), v2.end(),
                          std::back_inserter(result));
    // result: {3, 4, 5}
    
    return 0;
}
```

📖 [cppreference: std::set_intersection](https://en.cppreference.com/w/cpp/algorithm/set_intersection)

### std::set_difference
**Elements in first but not second**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v1 = {1, 2, 3, 4, 5};
    std::vector<int> v2 = {3, 4, 5, 6, 7};
    std::vector<int> result;
    
    std::set_difference(v1.begin(), v1.end(),
                        v2.begin(), v2.end(),
                        std::back_inserter(result));
    // result: {1, 2}
    
    return 0;
}
```

📖 [cppreference: std::set_difference](https://en.cppreference.com/w/cpp/algorithm/set_difference)

### std::set_symmetric_difference
**Elements in either but not both (XOR)**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v1 = {1, 2, 3, 4, 5};
    std::vector<int> v2 = {3, 4, 5, 6, 7};
    std::vector<int> result;
    
    std::set_symmetric_difference(v1.begin(), v1.end(),
                                  v2.begin(), v2.end(),
                                  std::back_inserter(result));
    // result: {1, 2, 6, 7}
    
    return 0;
}
```

📖 [cppreference: std::set_symmetric_difference](https://en.cppreference.com/w/cpp/algorithm/set_symmetric_difference)

### std::includes
**Check if all elements of second are in first**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v1 = {1, 2, 3, 4, 5};
    std::vector<int> v2 = {2, 3, 4};
    std::vector<int> v3 = {2, 3, 6};
    
    bool subset1 = std::includes(v1.begin(), v1.end(),
                                 v2.begin(), v2.end());
    std::cout << std::boolalpha << subset1 << '\n';  // true
    
    bool subset2 = std::includes(v1.begin(), v1.end(),
                                 v3.begin(), v3.end());
    std::cout << subset2 << '\n';  // false (6 not in v1)
    
    return 0;
}
```

📖 [cppreference: std::includes](https://en.cppreference.com/w/cpp/algorithm/includes)

---

## Heap Operations

### std::make_heap / std::push_heap / std::pop_heap

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {3, 1, 4, 1, 5, 9};
    
    // Create max heap
    std::make_heap(vec.begin(), vec.end());
    // vec: {9, 5, 4, 1, 1, 3} (heap property satisfied)
    
    // Top element
    std::cout << "Max: " << vec.front() << '\n';  // 9
    
    // Remove max (move to end)
    std::pop_heap(vec.begin(), vec.end());
    vec.pop_back();  // Actually remove
    // vec: {5, 3, 4, 1, 1}
    
    // Add element
    vec.push_back(7);
    std::push_heap(vec.begin(), vec.end());
    // vec: {7, 3, 5, 1, 1, 4}
    
    // Sort heap (destroys heap property)
    std::sort_heap(vec.begin(), vec.end());
    // vec: {1, 1, 3, 4, 5, 7} (sorted)
    
    return 0;
}
```

📖 [cppreference: std::make_heap](https://en.cppreference.com/w/cpp/algorithm/make_heap)

---

## Min/Max Operations

### std::min_element / std::max_element

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {3, 1, 4, 1, 5, 9, 2, 6};
    
    auto min_it = std::min_element(vec.begin(), vec.end());
    auto max_it = std::max_element(vec.begin(), vec.end());
    
    std::cout << "Min: " << *min_it << " at index " 
              << (min_it - vec.begin()) << '\n';  // 1 at index 1
    std::cout << "Max: " << *max_it << " at index " 
              << (max_it - vec.begin()) << '\n';  // 9 at index 5
    
    // Custom comparator - find longest string
    std::vector<std::string> words = {"hi", "hello", "a", "world"};
    auto longest = std::max_element(words.begin(), words.end(),
                                    [](const std::string& a, const std::string& b) {
                                        return a.length() < b.length();
                                    });
    std::cout << "Longest: " << *longest << '\n';  // "hello"
    
    return 0;
}
```

📖 [cppreference: std::min_element](https://en.cppreference.com/w/cpp/algorithm/min_element)

### std::minmax_element

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {3, 1, 4, 1, 5, 9, 2, 6};
    
    auto [min_it, max_it] = std::minmax_element(vec.begin(), vec.end());
    
    std::cout << "Min: " << *min_it << ", Max: " << *max_it << '\n';  // 1, 9
    
    return 0;
}
```

📖 [cppreference: std::minmax_element](https://en.cppreference.com/w/cpp/algorithm/minmax_element)

---

## Duplicate Handling in Set Operations

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    // Set operations preserve duplicates as multisets
    std::vector<int> v1 = {1, 1, 2, 2, 3};
    std::vector<int> v2 = {1, 2, 2, 3, 3};
    std::vector<int> result;
    
    // Union: max(count1, count2) occurrences
    std::set_union(v1.begin(), v1.end(),
                   v2.begin(), v2.end(),
                   std::back_inserter(result));
    // result: {1, 1, 2, 2, 3, 3}
    
    result.clear();
    // Intersection: min(count1, count2) occurrences
    std::set_intersection(v1.begin(), v1.end(),
                          v2.begin(), v2.end(),
                          std::back_inserter(result));
    // result: {1, 2, 2, 3}
    
    result.clear();
    // Difference: max(0, count1 - count2) occurrences
    std::set_difference(v1.begin(), v1.end(),
                        v2.begin(), v2.end(),
                        std::back_inserter(result));
    // result: {1}
    
    return 0;
}
```

---

## Complexity Summary

| Operation | Time Complexity |
|-----------|----------------|
| `merge` | O(n + m) |
| `inplace_merge` | O(n) with extra memory, O(n log n) without |
| Set operations | O(n + m) |
| Heap operations | O(log n) |
| `min_element/max_element` | O(n) |

---

## Key Takeaways

✅ **All set operations** require **sorted** input  
✅ **merge** is stable and preserves all duplicates  
✅ Set operations use **multiset semantics** for duplicates  
✅ **Heap operations** maintain heap property in O(log n)  
✅ **min/max_element** return **iterators**, not values

---

[← Previous: Module 5](./module-5-sorting-algorithms.md) | [Back to Index](./README.md) | [Next: Module 7 →](./module-7-functional-utilities.md)

