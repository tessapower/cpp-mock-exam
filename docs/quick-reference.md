# C++ CPP Exam Quick Reference

## Container Complexities

| Container             | Access | Insert Front | Insert Back | Insert Middle | Search   |
|-----------------------|--------|--------------|-------------|---------------|----------|
| **vector**            | O(1)   | O(n)         | O(1)*       | O(n)          | O(n)     |
| **deque**             | O(1)   | O(1)         | O(1)        | O(n)          | O(n)     |
| **list**              | O(n)   | O(1)         | O(1)        | O(1)**        | O(n)     |
| **forward_list**      | O(n)   | O(1)         | N/A         | O(1)**        | O(n)     |
| **array**             | O(1)   | N/A          | N/A         | N/A           | O(n)     |
| **set/map**           | N/A    | N/A          | N/A         | O(log n)      | O(log n) |
| **unordered_set/map** | N/A    | N/A          | N/A         | O(1)†         | O(1)†    |

\* Amortized | \*\* With iterator | † Average case

---

## Algorithm Complexities

| Algorithm                   | Complexity | Notes                        |
|-----------------------------|------------|------------------------------|
| **find**, **count**         | O(n)       | Linear search                |
| **binary_search**           | O(log n)   | Requires sorted              |
| **sort**                    | O(n log n) | Unstable                     |
| **stable_sort**             | O(n log n) | Stable, may use extra memory |
| **partial_sort**            | O(n log k) | Only first k elements        |
| **nth_element**             | O(n)       | Partition around nth         |
| **merge**                   | O(n + m)   | Requires sorted              |
| **set operations**          | O(n + m)   | Requires sorted              |
| **make_heap**               | O(n)       | Build heap                   |
| **push_heap**, **pop_heap** | O(log n)   | Heap operations              |

---

## Common Patterns

### Remove-Erase Idiom
```cpp
vec.erase(std::remove(vec.begin(), vec.end(), value), vec.end());
```

### Full Deduplication
```cpp
std::sort(vec.begin(), vec.end());
vec.erase(std::unique(vec.begin(), vec.end()), vec.end());
```

### Binary Search in Sorted Range
```cpp
if (std::binary_search(vec.begin(), vec.end(), value)) {
    // Found
}
auto it = std::lower_bound(vec.begin(), vec.end(), value);
```

### Transform with Lambda
```cpp
std::transform(src.begin(), src.end(), dest.begin(),
               [](int x) { return x * 2; });
```

---

## Key Distinctions

### lower_bound vs upper_bound
- `lower_bound`: First element **>=** value
- `upper_bound`: First element **>** value

### remove vs erase
- `remove`: Shifts elements, returns new logical end, **doesn't change size**
- `erase`: Actually removes elements, **changes size**

### sort vs stable_sort
- `sort`: Faster, **not stable**
- `stable_sort`: Preserves relative order of equal elements

### unique
- Only removes **consecutive** duplicates
- **Sort first** for full deduplication

---

## Must-Know Headers

```cpp
#include <vector>       // std::vector
#include <deque>        // std::deque
#include <list>         // std::list
#include <array>        // std::array
#include <set>          // std::set, std::multiset
#include <map>          // std::map, std::multimap
#include <unordered_set> // std::unordered_set
#include <unordered_map> // std::unordered_map
#include <stack>        // std::stack
#include <queue>        // std::queue, std::priority_queue
#include <algorithm>    // Algorithms
#include <functional>   // std::function, std::bind
#include <iostream>     // I/O streams
#include <fstream>      // File streams
#include <sstream>      // String streams
#include <iomanip>      // I/O manipulators
```

---

## Stream Manipulators

### Require `<iomanip>`
- `std::setw(n)` - Field width (next output only!)
- `std::setprecision(n)` - Decimal precision (persistent)
- `std::setfill(c)` - Fill character (persistent)

### In `<iostream>`
- `std::endl` - Newline + flush (slow!)
- `std::flush` - Flush buffer
- `std::boolalpha` - Print bool as true/false
- `std::hex`, `std::oct`, `std::dec` - Number base

---

## Template Syntax

### Function Template
```cpp
template<typename T>
T max(T a, T b) { return a > b ? a : b; }
```

### Class Template
```cpp
template<typename T>
class Container { /* ... */ };
```

### Template Specialization
```cpp
template<>
class Container<const char*> { /* special impl */ };
```

### Variadic Template
```cpp
template<typename... Args>
void print(Args... args) { ((std::cout << args), ...); }
```

---

## Deprecated (Know for Exam!)

### Removed in C++17
- `std::bind1st`, `std::bind2nd` → Use `std::bind` or lambdas
- `std::ptr_fun` → Not needed
- `std::mem_fun`, `std::mem_fun_ref` → Use `std::mem_fn`

### Removed in C++20
- `std::not1`, `std::not2` → Use `std::not_fn`

---

## Common Pitfalls

❌ **setw applies to next output only**
```cpp
std::cout << std::setw(10) << 42 << 123;  // Only 42 is padded!
```

❌ **unique doesn't sort**
```cpp
vec = {1, 3, 1, 2};
std::unique(vec.begin(), vec.end());  // {1, 3, 1, 2} - unchanged!
```

❌ **operator[] creates if doesn't exist**
```cpp
std::map<std::string, int> m;
int x = m["key"];  // Creates entry with value 0!
```

❌ **endl is slow**
```cpp
std::cout << "Line" << std::endl;  // Flushes every time (slow)
std::cout << "Line" << '\n';       // Faster
```

---

## Last-Minute Tips

✅ Default to **vector**, use others when needed  
✅ Binary search algorithms **require sorted input**  
✅ Remember **remove-erase idiom**  
✅ **Comparators** must satisfy strict weak ordering  
✅ **Iterators** can be invalidated by modifications  
✅ **stable_** variants preserve order but slower  
✅ Prefer **lambdas** over `std::bind`

Good luck! 🎓

