# Module 4: Modifying Sequence Operations

## Overview

Modifying algorithms change, rearrange, or manipulate elements in containers.

📖 [cppreference: Modifying sequence operations](https://en.cppreference.com/w/cpp/algorithm)

---

## Copy and Move

### std::copy / std::copy_if / std::copy_backward

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> src = {1, 2, 3, 4, 5};
    std::vector<int> dest(5);
    
    // Copy all elements
    std::copy(src.begin(), src.end(), dest.begin());
    // dest: {1, 2, 3, 4, 5}
    
    // Copy only even numbers
    std::vector<int> evens;
    std::copy_if(src.begin(), src.end(), std::back_inserter(evens),
                 [](int x) { return x % 2 == 0; });
    // evens: {2, 4}
    
    // Copy backward (useful for overlapping ranges)
    std::vector<int> vec = {1, 2, 3, 4, 5};
    std::copy_backward(vec.begin(), vec.begin() + 3, vec.end());
    // vec: {1, 2, 1, 2, 3}
    
    return 0;
}
```

📖 [cppreference: std::copy](https://en.cppreference.com/w/cpp/algorithm/copy)

---

## Transform

### std::transform

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> src = {1, 2, 3, 4};
    std::vector<int> dest(4);
    
    // Unary transformation
    std::transform(src.begin(), src.end(), dest.begin(),
                   [](int x) { return x * 2; });
    // dest: {2, 4, 6, 8}
    
    // Binary transformation (combine two ranges)
    std::vector<int> src2 = {10, 20, 30, 40};
    std::transform(src.begin(), src.end(), src2.begin(), dest.begin(),
                   [](int a, int b) { return a + b; });
    // dest: {11, 22, 33, 44}
    
    return 0;
}
```

📖 [cppreference: std::transform](https://en.cppreference.com/w/cpp/algorithm/transform)

---

## Fill and Generate

### std::fill / std::fill_n / std::generate / std::generate_n

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec(5);
    
    // Fill with value
    std::fill(vec.begin(), vec.end(), 42);
    // vec: {42, 42, 42, 42, 42}
    
    // Fill first n elements
    std::fill_n(vec.begin(), 3, 10);
    // vec: {10, 10, 10, 42, 42}
    
    // Generate using function
    int counter = 0;
    std::generate(vec.begin(), vec.end(), [&counter]() { return counter++; });
    // vec: {0, 1, 2, 3, 4}
    
    // Generate first n elements
    std::generate_n(vec.begin(), 3, []() { return rand() % 100; });
    
    return 0;
}
```

📖 [cppreference: std::fill](https://en.cppreference.com/w/cpp/algorithm/fill)

---

## Remove and Replace

### std::remove / std::remove_if
**⚠️ Important: Remove doesn't actually erase! Use remove-erase idiom.**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 2, 4, 2, 5};
    
    // Remove moves elements, returns new logical end
    auto new_end = std::remove(vec.begin(), vec.end(), 2);
    // vec: {1, 3, 4, 5, ?, ?, ?} - size unchanged!
    
    // Actually erase: remove-erase idiom
    vec.erase(new_end, vec.end());
    // vec: {1, 3, 4, 5}
    
    // One-liner version
    vec = {1, 2, 3, 2, 4, 2, 5};
    vec.erase(std::remove(vec.begin(), vec.end(), 2), vec.end());
    
    // Remove with predicate
    vec = {1, 2, 3, 4, 5, 6};
    vec.erase(std::remove_if(vec.begin(), vec.end(),
                             [](int x) { return x % 2 == 0; }),
              vec.end());
    // vec: {1, 3, 5}
    
    return 0;
}
```

📖 [cppreference: std::remove](https://en.cppreference.com/w/cpp/algorithm/remove)

### std::replace / std::replace_if

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 2, 4};
    
    // Replace all 2's with 99
    std::replace(vec.begin(), vec.end(), 2, 99);
    // vec: {1, 99, 3, 99, 4}
    
    // Replace with predicate
    std::replace_if(vec.begin(), vec.end(),
                    [](int x) { return x > 10; }, 0);
    // vec: {1, 0, 3, 0, 4}
    
    return 0;
}
```

📖 [cppreference: std::replace](https://en.cppreference.com/w/cpp/algorithm/replace)

---

## Unique

### std::unique
**⚠️ Removes consecutive duplicates only! Sort first for full deduplication.**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 1, 2, 2, 2, 3, 1, 1};
    
    // Remove consecutive duplicates
    auto new_end = std::unique(vec.begin(), vec.end());
    vec.erase(new_end, vec.end());
    // vec: {1, 2, 3, 1} - not fully deduplicated!
    
    // For full deduplication: sort first
    vec = {1, 3, 1, 2, 3, 2, 1};
    std::sort(vec.begin(), vec.end());  // {1, 1, 1, 2, 2, 3, 3}
    vec.erase(std::unique(vec.begin(), vec.end()), vec.end());
    // vec: {1, 2, 3}
    
    return 0;
}
```

📖 [cppreference: std::unique](https://en.cppreference.com/w/cpp/algorithm/unique)

---

## Reverse and Rotate

### std::reverse / std::rotate

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    
    // Reverse in-place
    std::reverse(vec.begin(), vec.end());
    // vec: {5, 4, 3, 2, 1}
    
    // Rotate: move elements circularly
    vec = {1, 2, 3, 4, 5};
    std::rotate(vec.begin(), vec.begin() + 2, vec.end());
    // vec: {3, 4, 5, 1, 2}
    // Elements before middle move to end
    
    return 0;
}
```

📖 [cppreference: std::reverse](https://en.cppreference.com/w/cpp/algorithm/reverse)  
📖 [cppreference: std::rotate](https://en.cppreference.com/w/cpp/algorithm/rotate)

---

## Shuffle and Partition

### std::shuffle

```cpp
#include <algorithm>
#include <vector>
#include <random>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    
    std::random_device rd;
    std::mt19937 g(rd());
    
    std::shuffle(vec.begin(), vec.end(), g);
    // vec: random permutation
    
    return 0;
}
```

📖 [cppreference: std::shuffle](https://en.cppreference.com/w/cpp/algorithm/random_shuffle)

### std::partition / std::stable_partition

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 5, 2, 6, 3, 7, 4};
    
    // Partition: reorder so predicate-true come first
    auto partition_point = std::partition(vec.begin(), vec.end(),
                                          [](int x) { return x % 2 == 0; });
    // vec: {2, 6, 4, 1, 5, 3, 7} (evens first, order not preserved)
    
    // stable_partition preserves relative order
    vec = {1, 5, 2, 6, 3, 7, 4};
    auto sp = std::stable_partition(vec.begin(), vec.end(),
                                    [](int x) { return x % 2 == 0; });
    // vec: {2, 6, 4, 1, 5, 3, 7} (evens first, order preserved)
    
    return 0;
}
```

📖 [cppreference: std::partition](https://en.cppreference.com/w/cpp/algorithm/partition)

---

## Swap

### std::swap / std::swap_ranges / std::iter_swap

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    int a = 5, b = 10;
    std::swap(a, b);  // a=10, b=5
    
    std::vector<int> v1 = {1, 2, 3};
    std::vector<int> v2 = {7, 8, 9};
    
    // Swap ranges
    std::swap_ranges(v1.begin(), v1.end(), v2.begin());
    // v1: {7, 8, 9}, v2: {1, 2, 3}
    
    // Swap using iterators
    std::iter_swap(v1.begin(), v1.begin() + 2);
    // v1: {9, 8, 7}
    
    return 0;
}
```

📖 [cppreference: std::swap](https://en.cppreference.com/w/cpp/algorithm/swap)

---

## Key Takeaways

✅ **remove/unique** don't actually erase - use **remove-erase idiom**  
✅ **_if variants** use predicates  
✅ **_copy variants** write to output range without modifying source  
✅ **stable_ variants** preserve relative order  
✅ **unique** only removes **consecutive** duplicates - sort first for full dedup

---

[← Previous: Module 3](./module-3-non-modifying-operations.md) | [Back to Index](./README.md) | [Next: Module 5 →](./module-5-sorting-algorithms.md)

