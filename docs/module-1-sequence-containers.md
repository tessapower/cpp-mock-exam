# Module 1: Sequence Containers and Container Adapters

## Overview

Sequence containers store elements in a linear sequence, where each element has a specific position. Container adapters provide specialized interfaces on top of underlying sequence containers.

## 📚 Contents

- [Sequential Containers](#sequential-containers)
  - [std::vector](#stdvector)
  - [std::deque](#stddeque)
  - [std::list](#stdlist)
  - [std::forward_list](#stdforward_list)
  - [std::array](#stdarray)
- [Container Adapters](#container-adapters)
  - [std::stack](#stdstack)
  - [std::queue](#stdqueue)
  - [std::priority_queue](#stdpriority_queue)

---

## Sequential Containers

### std::vector

**Dynamic array with contiguous storage**

- 📖 [cppreference: std::vector](https://en.cppreference.com/w/cpp/container/vector)

#### Characteristics
- **Random access**: O(1)
- **Insert/Delete at end**: Amortized O(1)
- **Insert/Delete elsewhere**: O(n)
- **Memory**: Contiguous, may over-allocate

#### When to Use
✅ Default choice for most scenarios  
✅ Need fast random access  
✅ Mostly insert/delete at the end  
✅ Cache-friendly performance needed

#### Example
```cpp
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3};
    
    // Random access - O(1)
    std::cout << vec[1] << '\n';  // 2
    
    // Add at end - O(1) amortized
    vec.push_back(4);
    
    // Capacity management
    vec.reserve(100);  // Pre-allocate space
    std::cout << "Size: " << vec.size() << '\n';      // 4
    std::cout << "Capacity: " << vec.capacity() << '\n';  // >= 100
    
    // Iteration
    for (const auto& val : vec) {
        std::cout << val << ' ';
    }
    std::cout << '\n';  // 1 2 3 4
    
    return 0;
}
```

#### Key Methods
```cpp
// Element access
vec[i];           // No bounds checking
vec.at(i);        // With bounds checking
vec.front();      // First element
vec.back();       // Last element
vec.data();       // Pointer to underlying array

// Capacity
vec.size();
vec.capacity();
vec.empty();
vec.reserve(n);   // Pre-allocate
vec.shrink_to_fit();

// Modifiers
vec.push_back(val);
vec.pop_back();
vec.insert(pos, val);
vec.erase(pos);
vec.clear();
```

---

### std::deque

**Double-ended queue with non-contiguous storage**

- 📖 [cppreference: std::deque](https://en.cppreference.com/w/cpp/container/deque)

#### Characteristics
- **Random access**: O(1)
- **Insert/Delete at both ends**: O(1)
- **Insert/Delete in middle**: O(n)
- **Memory**: Non-contiguous chunks

#### When to Use
✅ Need efficient insertion/deletion at both ends  
✅ Need random access  
❌ Don't need as good cache locality as vector

#### Example
```cpp
#include <deque>
#include <iostream>

int main() {
    std::deque<int> deq = {3, 4, 5};
    
    // Insert at both ends - O(1)
    deq.push_front(2);  // {2, 3, 4, 5}
    deq.push_back(6);   // {2, 3, 4, 5, 6}
    
    // Random access - O(1)
    std::cout << deq[2] << '\n';  // 4
    
    // Remove from both ends - O(1)
    deq.pop_front();  // {3, 4, 5, 6}
    deq.pop_back();   // {3, 4, 5}
    
    return 0;
}
```

#### Deque vs Vector

| Feature | Vector | Deque |
|---------|--------|-------|
| Random Access | O(1) ✓ | O(1) ✓ |
| Push/Pop Front | O(n) | O(1) ✓ |
| Push/Pop Back | O(1) ✓ | O(1) ✓ |
| Contiguous Memory | Yes ✓ | No |
| Cache Locality | Better ✓ | Worse |
| Iterator Invalidation | More | Less |

---

### std::list

**Doubly-linked list**

- 📖 [cppreference: std::list](https://en.cppreference.com/w/cpp/container/list)

#### Characteristics
- **Random access**: Not supported (must traverse)
- **Insert/Delete anywhere**: O(1) with iterator
- **Search**: O(n)
- **Memory**: Non-contiguous nodes

#### When to Use
✅ Frequent insertions/deletions in middle  
✅ Need stable iterators (never invalidated on insert)  
✅ Don't need random access  
❌ Avoid if you need fast element lookup

#### Example
```cpp
#include <list>
#include <iostream>

int main() {
    std::list<int> lst = {1, 2, 4, 5};
    
    // Insert in middle - O(1) with iterator
    auto it = lst.begin();
    std::advance(it, 2);  // Move to position 2
    lst.insert(it, 3);    // {1, 2, 3, 4, 5}
    
    // Splice - O(1) operation
    std::list<int> lst2 = {10, 20};
    lst.splice(lst.begin(), lst2);  // {10, 20, 1, 2, 3, 4, 5}
    // lst2 is now empty
    
    // List-specific operations
    lst.reverse();        // Reverse in-place
    lst.sort();           // Sort in-place
    lst.unique();         // Remove consecutive duplicates
    
    for (const auto& val : lst) {
        std::cout << val << ' ';
    }
    std::cout << '\n';
    
    return 0;
}
```

#### Key Methods (List-Specific)
```cpp
// Operations that don't invalidate iterators
lst.splice(pos, other_list);      // Move elements
lst.remove(value);                 // Remove all occurrences
lst.remove_if(predicate);          // Conditional remove
lst.reverse();                     // Reverse order
lst.unique();                      // Remove consecutive duplicates
lst.sort();                        // Sort in-place
lst.merge(other_list);            // Merge two sorted lists
```

---

### std::forward_list

**Singly-linked list**

- 📖 [cppreference: std::forward_list](https://en.cppreference.com/w/cpp/container/forward_list)

#### Characteristics
- **Forward iteration only**
- **Lower memory overhead than list**
- **No size() method** (for performance)
- **Insert after position**: O(1)

#### When to Use
✅ Need minimal memory overhead  
✅ Only need forward iteration  
✅ Don't need bidirectional access  
❌ Most cases prefer std::list

#### Example
```cpp
#include <forward_list>
#include <iostream>

int main() {
    std::forward_list<int> flist = {1, 2, 3};
    
    // Insert after position
    auto it = flist.begin();
    flist.insert_after(it, 10);  // {1, 10, 2, 3}
    
    // Push front only (no push_back)
    flist.push_front(0);  // {0, 1, 10, 2, 3}
    
    // No size() method!
    // Use std::distance if needed (but it's O(n))
    int size = std::distance(flist.begin(), flist.end());
    
    // Forward iteration only
    for (const auto& val : flist) {
        std::cout << val << ' ';
    }
    std::cout << '\n';
    
    return 0;
}
```

---

### std::array

**Fixed-size array wrapper**

- 📖 [cppreference: std::array](https://en.cppreference.com/w/cpp/container/array)

#### Characteristics
- **Size known at compile time**
- **No dynamic allocation** (stack-based)
- **Same performance as C array**
- **Cannot be resized**

#### When to Use
✅ Size known at compile time  
✅ Want STL container interface on array  
✅ Need bounds checking (with .at())  
❌ Need dynamic size

#### Example
```cpp
#include <array>
#include <iostream>

int main() {
    // Size must be compile-time constant
    std::array<int, 5> arr = {1, 2, 3, 4, 5};
    
    // All vector operations except resizing
    std::cout << arr[2] << '\n';      // 3
    std::cout << arr.at(2) << '\n';   // 3 (with bounds check)
    
    // Size is fixed
    std::cout << arr.size() << '\n';  // 5 (always)
    
    // C-style array access
    int* ptr = arr.data();
    
    // Aggregate initialization
    std::array<int, 3> arr2{};  // All zeros: {0, 0, 0}
    
    return 0;
}
```

---

## Container Adapters

Container adapters provide a different interface to underlying sequence containers.

### std::stack

**LIFO (Last-In-First-Out) adapter**

- 📖 [cppreference: std::stack](https://en.cppreference.com/w/cpp/container/stack)

#### Characteristics
- **Underlying container**: `deque` (default), `vector`, or `list`
- **Operations**: push, pop, top
- **No iteration** (restricted interface)

#### Example
```cpp
#include <stack>
#include <iostream>

int main() {
    std::stack<int> stk;
    
    // Push elements
    stk.push(1);
    stk.push(2);
    stk.push(3);
    
    // Access top (no indexing!)
    std::cout << stk.top() << '\n';  // 3
    
    // Pop (doesn't return value in C++)
    stk.pop();
    std::cout << stk.top() << '\n';  // 2
    
    // Size
    std::cout << stk.size() << '\n';  // 2
    
    // Using vector as underlying container
    std::stack<int, std::vector<int>> stk_vec;
    
    return 0;
}
```

---

### std::queue

**FIFO (First-In-First-Out) adapter**

- 📖 [cppreference: std::queue](https://en.cppreference.com/w/cpp/container/queue)

#### Characteristics
- **Underlying container**: `deque` (default) or `list`
- **Operations**: push (back), pop (front), front, back

#### Example
```cpp
#include <queue>
#include <iostream>

int main() {
    std::queue<int> q;
    
    // Enqueue
    q.push(1);
    q.push(2);
    q.push(3);
    
    // Access front and back
    std::cout << q.front() << '\n';  // 1
    std::cout << q.back() << '\n';   // 3
    
    // Dequeue
    q.pop();
    std::cout << q.front() << '\n';  // 2
    
    return 0;
}
```

---

### std::priority_queue

**Heap-based priority queue**

- 📖 [cppreference: std::priority_queue](https://en.cppreference.com/w/cpp/container/priority_queue)

#### Characteristics
- **Underlying container**: `vector` (default) or `deque`
- **Heap structure**: Max-heap by default
- **Operations**: push O(log n), pop O(log n), top O(1)

#### Example
```cpp
#include <queue>
#include <iostream>
#include <vector>

int main() {
    // Max-heap (default)
    std::priority_queue<int> pq;
    
    pq.push(3);
    pq.push(1);
    pq.push(4);
    pq.push(2);
    
    while (!pq.empty()) {
        std::cout << pq.top() << ' ';  // 4 3 2 1
        pq.pop();
    }
    std::cout << '\n';
    
    // Min-heap (using greater comparator)
    std::priority_queue<int, std::vector<int>, std::greater<int>> min_pq;
    
    min_pq.push(3);
    min_pq.push(1);
    min_pq.push(4);
    
    while (!min_pq.empty()) {
        std::cout << min_pq.top() << ' ';  // 1 3 4
        min_pq.pop();
    }
    std::cout << '\n';
    
    return 0;
}
```

---

## Container Comparison Summary

| Container | Random Access | Insert Front | Insert Back | Insert Middle | Iterator Invalidation |
|-----------|---------------|--------------|-------------|---------------|-----------------------|
| **vector** | O(1) ✓ | O(n) | O(1)* | O(n) | On reallocation |
| **deque** | O(1) ✓ | O(1) ✓ | O(1) ✓ | O(n) | On middle insert |
| **list** | O(n) | O(1) ✓ | O(1) ✓ | O(1)** ✓ | Never (except erased) |
| **forward_list** | O(n) | O(1) ✓ | N/A | O(1)** ✓ | Never (except erased) |
| **array** | O(1) ✓ | N/A | N/A | N/A | Never |

\* Amortized  
\*\* With iterator to position

---

## Practice Questions

1. When should you use `std::deque` instead of `std::vector`?
2. Why doesn't `std::forward_list` provide a `size()` method?
3. What's the time complexity of `std::list::splice()` for a single element?
4. Which containers can be used as the underlying container for `std::stack`?
5. What happens to iterators when you insert an element into `std::list`?

## Key Takeaways

✅ **Default to `vector`** for most use cases  
✅ Use **`deque`** when you need efficient front/back operations  
✅ Use **`list`** when you need stable iterators and middle insertion  
✅ Use **`array`** when size is known at compile time  
✅ Container adapters (**stack, queue, priority_queue**) restrict interface for specific use patterns

---

[← Back to Index](./README.md) | [Next: Module 2 - Associative Containers →](./module-2-associative-containers.md)

