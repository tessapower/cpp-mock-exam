# Module 1: Sequence Containers and Container Adapters

## Overview

**What are Sequence Containers?**

Sequence containers are fundamental building blocks in C++ that store collections of elements in a specific, linear order. Unlike associative containers (which organize data by keys), sequence containers maintain the order in which you insert elements.

Think of them as different types of storage boxes:
- A **vector** is like a resizable array that grows as needed
- A **list** is like a chain where each element links to the next
- An **array** is like a fixed-size box that never changes size

**Why Do We Need Different Containers?**

Different containers optimize for different operations. Choosing the right container is crucial for performance:
- Need fast access to any element? Use **vector** or **array**
- Need to frequently add/remove from both ends? Use **deque**
- Need to insert/remove elements in the middle? Use **list**

**Container Adapters: Specialized Interfaces**

Container adapters are wrappers that provide a specific interface (like a stack or queue) on top of an underlying sequence container. They restrict operations to enforce specific access patterns, making your code safer and more expressive.

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

#### What is std::vector?

`std::vector` is a dynamic array that can grow and shrink automatically. It's the most commonly used container in C++ and should be your default choice unless you have a specific reason to use something else.

**How It Works Internally:**

Imagine a vector as an array that lives on the heap. When you create a vector, it allocates a block of memory (the **capacity**). As you add elements:
1. Elements are stored in consecutive memory locations (contiguous storage)
2. When you reach capacity, the vector allocates a larger block (typically double the size)
3. All elements are copied/moved to the new location
4. The old memory is deallocated

This is why adding elements is usually fast (O(1)), but occasionally slow when reallocation happens (amortized O(1)).

**Visual Representation:**
```
Vector with capacity 4, size 3:
[1][2][3][ ] <- unused capacity
 ↑       ↑
 begin   end
 
After push_back(4):
[1][2][3][4] <- now full, capacity = size

After push_back(5) - reallocation needed:
[1][2][3][4][5][ ][ ][ ] <- new capacity: 8
```

#### Characteristics
- **Random access**: O(1) - Can access any element instantly using index
- **Insert/Delete at end**: Amortized O(1) - Usually fast, occasionally slow
- **Insert/Delete elsewhere**: O(n) - Must shift all subsequent elements
- **Memory**: Contiguous (cache-friendly), may over-allocate for growth

#### When to Use
✅ **Default choice** for most scenarios - start here unless proven otherwise  
✅ Need **fast random access** to elements by index  
✅ Mostly **insert/delete at the end** (push_back/pop_back)  
✅ **Cache-friendly performance** needed (data locality matters)  
✅ Need to pass data to **C APIs** (can use `.data()` to get raw pointer)

#### When NOT to Use
❌ Frequent insertions/deletions in the middle (use `list` instead)  
❌ Frequent insertions at the beginning (use `deque` instead)  
❌ Fixed size known at compile time (use `array` instead)

#### Understanding Capacity vs Size

**Key Concept:** Size is how many elements you have; capacity is how many you can hold without reallocating.

```cpp
std::vector<int> vec;
vec.reserve(100);  // Allocate space for 100 elements

std::cout << vec.size();      // 0 - no elements yet
std::cout << vec.capacity();  // 100 - can hold 100 before reallocating
```

**Resizing Vectors**

Avoiding frequent reallocations and excessive memory usage is key for 
performance:

- Know the final size? Use `reserve()` to avoid reallocations.
- Want to reduce memory? Use `shrink_to_fit()` to release unused capacity.

#### Example: Basic Operations

```cpp
#include <vector>
#include <iostream>

int main() {
  // Creating a vector
  std::vector<int> vec = {1, 2, 3};  // Initialize with values
  std::vector<int> vec2(5);          // 5 elements, default-initialized to 0
  std::vector<int> vec3(5, 42);      // 5 elements, all set to 42

  // Random access - O(1)
  std::cout << vec[1] << '\n';        // 2 - no bounds checking!
  std::cout << vec.at(1) << '\n';     // 2 - throws if out of range

  // Adding elements at end - O(1) amortized
  vec.push_back(4);                   // vec is now {1, 2, 3, 4}
  vec.push_back(5);                   // vec is now {1, 2, 3, 4, 5}

  // Understanding capacity growth
  std::cout << "Size: " << vec.size() << '\n';         // 5
  std::cout << "Capacity: " << vec.capacity() << '\n'; // Probably 6 or 8

  // Pre-allocate if you know the size (avoids reallocations)
  std::vector<int> big_vec;
  big_vec.reserve(1000);  // Reserve space for 1000 elements
  for (int i = 0; i < 1000; ++i) {
    big_vec.push_back(i);  // No reallocations!
  }

  // Accessing elements safely
  if (!vec.empty()) {
    std::cout << "First: " << vec.front() << '\n';  // 1
    std::cout << "Last: " << vec.back() << '\n';    // 5
  }

  // Iteration - multiple ways
  // 1. Range-based for (C++11) - most readable
  for (int x : vec) {
    std::cout << x << ' ';
  }
  std::cout << '\n';

  // 2. Iterator-based
  for (auto it = vec.begin(); it != vec.end(); ++it) {
    std::cout << *it << ' ';
  }
  std::cout << '\n';

  // 3. Index-based (when you need the index)
  for (size_t i = 0; i < vec.size(); ++i) {
    std::cout << vec[i] << ' ';
  }
  std::cout << '\n';

  // Modifying elements
  vec[0] = 10;            // Direct assignment
  vec.at(1) = 20;         // Safe assignment with bounds checking

  // Removing elements
  vec.pop_back();         // Remove last element - O(1)
  vec.erase(vec.begin()); // Remove first element - O(n)!

  return 0;
}
```

#### Common Patterns and Pitfalls

**Pattern 1: Efficient Building**

This is important because frequent reallocations can kill performance:

```cpp
// ❌ Bad - multiple reallocations
std::vector<int> vec;
for (int i = 0; i < 10000; ++i) {
  vec.push_back(i);
}

// ✅ Good - reserve first
std::vector<int> vec;
vec.reserve(10000);
for (int i = 0; i < 10000; ++i) {
  vec.push_back(i);
}
```

**Pattern 2: Safe Access**

Safely access elements to avoid undefined behavior or exceptions:

```cpp
std::vector<int> vec = {1, 2, 3};

// ❌ Dangerous - no bounds checking, undefined behavior
std::cout << vec[10];

// ✅ Safe - throws std::out_of_range exception
try {
  std::cout << vec.at(10);
} catch (const std::out_of_range& e) {
  std::cout << "Index out of range!\n";
}
```

**Pattern 3: Iterator Invalidation**

Iterators can become invalid after certain operations, because the 
underlying array may be reallocated:

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};
auto it = vec.begin();

vec.push_back(6);  // May reallocate!
// ❌ 'it' might now be invalid - undefined behavior
// std::cout << *it;

// ✅ Get iterator after modifications
it = vec.begin();
std::cout << *it;  // Safe
```
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

#### What is std::deque?

`std::deque` (pronounced "deck") stands for **double-ended queue**. It's
like a vector that's efficient at both ends - you can add or remove elements
quickly from either the front or back.

**How It Works Internally:**

Unlike vector's single contiguous block, deque is typically implemented as a
collection of fixed-size chunks:

```
Visual representation:
[Chunk 1: 1 2 3] [Chunk 2: 4 5 6] [Chunk 3: 7 8 9]
       ↑                                 ↑
     front                              back
```

When you add to the front, it can allocate a new chunk before the first one.
When you add to the back, it allocates after. This is why both operations
are O(1).

**The Trade-off:**

- ✅ Fast insertion/deletion at both ends
- ❌ Slightly slower random access than vector (must calculate which chunk)
- ❌ Less cache-friendly (chunks aren't adjacent in memory)

#### Characteristics

- **Random access**: O(1) - but slightly slower than vector
- **Insert/Delete at both ends**: O(1) - this is the key advantage!
- **Insert/Delete in middle**: O(n) - same as vector
- **Memory**: Non-contiguous chunks

#### When to Use

✅ Need efficient **push/pop from both ends** (front AND back)
✅ Need **random access** (like vector)
✅ Don't need memory to be contiguous

#### When NOT to Use

❌ Only insert/delete at one end (use `vector` instead)
❌ Need best possible cache performance (use `vector`)
❌ Need to pass raw pointer to C API (no `.data()` method)

#### Example: The Key Advantage

```cpp
#include <deque>
#include <iostream>

int main() {
  std::deque<int> d = {3, 4, 5};

  // The magic of deque - efficient at BOTH ends!
  d.push_front(2);  // O(1) - vector would be O(n)!
  d.push_front(1);  // O(1)
  d.push_back(6);   // O(1)
  d.push_back(7);   // O(1)

  // d is now: {1, 2, 3, 4, 5, 6, 7}

  // Random access still works
  std::cout << d[3] << '\n';  // 4

  // Remove from both ends - O(1)
  d.pop_front();  // Removes 1
  d.pop_back();   // Removes 7

  // d is now: {2, 3, 4, 5, 6}

  // All vector operations still work
  std::cout << "First: " << d.front() << '\n';  // 2
  std::cout << "Last: " << d.back() << '\n';    // 6

  return 0;
}
```

#### Real-World Use Case: Sliding Window

Deque is perfect for algorithms that need to maintain a "window" of elements:

```cpp
#include <deque>
#include <iostream>

// Find maximum in every window of size k
void slidingWindowMax(const std::vector<int>& nums, int k) {
  std::deque<int> dq;  // Store indices

  for (int i = 0; i < nums.size(); ++i) {
    // Remove elements outside current window
    if (!dq.empty() && dq.front() <= i - k) {
      dq.pop_front();  // Efficient removal from front!
    }

    // Remove smaller elements (they'll never be maximum)
    while (!dq.empty() && nums[dq.back()] < nums[i]) {
      dq.pop_back();   // Efficient removal from back!
    }

    dq.push_back(i);

    // Print maximum of current window
    if (i >= k - 1) {
      std::cout << nums[dq.front()] << ' ';
    }
  }
}
```

#### Deque vs Vector

| Feature               | Vector   | Deque  |
|-----------------------|----------|--------|
| Random Access         | O(1) ✓   | O(1) ✓ |
| Push/Pop Front        | O(n)     | O(1) ✓ |
| Push/Pop Back         | O(1) ✓   | O(1) ✓ |
| Contiguous Memory     | Yes ✓    | No     |
| Cache Locality        | Better ✓ | Worse  |
| Iterator Invalidation | More     | Less   |

---

### std::list

**Doubly-linked list**

- 📖 [cppreference: std::list](https://en.cppreference.com/w/cpp/container/list)

#### What is std::list?

`std::list` is a **doubly-linked list** where each element (node) contains:

1. The data value
2. A pointer to the previous element
3. A pointer to the next element

**Visual Representation:**

```
nullptr ← [1] ↔ [2] ↔ [3] ↔ [4] → nullptr
          ↑              ↑
        begin          back
```

**The Fundamental Trade-off:**

- ✅ Insert/delete anywhere in O(1) - just change a few pointers
- ❌ No random access - must walk the list from beginning
- ❌ Higher memory overhead - extra pointers for each element
- ❌ Poor cache locality - nodes scattered in memory

#### How Insertion Works

This is where list shines! Compare to vector:

```cpp
// Vector insertion at position 2
[1][2][3][4][5]
      ↓ insert 99
[1][2][99][3][4][5]
Must shift → [3][4][5] (expensive!)

// List insertion at position 2
[1] ↔ [2] ↔ [3] ↔ [4]
       ↓ insert 99
[1] ↔ [2] ↔ [99] ↔ [3] ↔ [4]
Just update 4 pointers (fast!)
```

#### Characteristics

- **Random access**: Not supported - must iterate (O(n))
- **Insert/Delete anywhere**: O(1) **if you have an iterator**
- **Search**: O(n) - must walk the list
- **Memory**: Non-contiguous nodes, higher overhead per element

#### When to Use

✅ Frequent **insertions/deletions in the middle** of the sequence  
✅ Need **stable iterators** (never invalidated except when element is deleted)  
✅ Frequently **splicing** (moving elements between lists)  
✅ Don't need random access

#### When NOT to Use

❌ Need to access elements by index frequently (use `vector` or `deque`)  
❌ Memory usage is critical (extra pointers per element)  
❌ Cache performance matters (poor data locality)

#### Example: Where List Excels

```cpp
#include <list>
#include <iostream>

int main() {
  std::list<int> lst = {1, 2, 4, 5};

  // Insert in middle - O(1) with iterator!
  auto it = lst.begin();
  std::advance(it, 2);  // Move to position 2 (value 4)
  lst.insert(it, 3);    // Insert 3 before 4
  // lst is now: {1, 2, 3, 4, 5}

  // Iterator is still valid! (not true for vector)
  std::cout << *it << '\n';  // Still points to 4

  // List-specific operations
  lst.reverse();        // O(n) - reverse in-place
  // lst: {5, 4, 3, 2, 1}

  lst.sort();           // O(n log n) - stable sort
  // lst: {1, 2, 3, 4, 5}

  return 0;
}
```

#### The Power of Splice

Splice is list's superpower - moving elements between lists in O(1):

```cpp
#include <list>
#include <iostream>

int main() {
  std::list<int> list1 = {1, 2, 3};
  std::list<int> list2 = {10, 20, 30};

  // Move all of list2 to beginning of list1 - O(1)!
  list1.splice(list1.begin(), list2);
  // list1: {10, 20, 30, 1, 2, 3}
  // list2: {} (empty - elements were MOVED, not copied)

  // Move single element
  list1.splice(list1.begin(), list1, std::next(list1.begin(), 3));
  // Moves element at position 3 to front

  for (int x : list1) {
    std::cout << x << ' '; // 2 10 20 30 1 3
  }
  std::cout << '\n';

  return 0;
}
```

#### Understanding Iterator Stability

This is a huge advantage of list:

```cpp
std::list<int> lst = {1, 2, 3, 4, 5};
auto it1 = lst.begin();  // Points to 1
auto it2 = std::next(lst.begin(), 2);  // Points to 3

// Insert many elements
lst.insert(lst.end(), 100, 42);

// ✅ Iterators still valid!
std::cout << *it1 << '\n';  // Still 1
std::cout << *it2 << '\n';  // Still 3

// Compare with vector - iterators would be invalidated!
```
```

#### Key Methods (List-Specific)

```cpp
// Operations that don't invalidate iterators or references
lst.splice(pos, other_list);      // Move elements
lst.remove(value);                // Remove all occurrences
lst.remove_if(predicate);         // Conditional remove
lst.reverse();                    // Reverse order
lst.unique();                     // Remove consecutive duplicates
lst.sort();                       // Sort in-place
lst.merge(other_list);            // Merge two sorted lists
lst.insert(pos, value);           // Insert before pos
lst.insert(pos, count, value);    // Insert multiple of same value
lst.insert(pos, inis_list) ;      // Insert from initializer list
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
    std::cout << val << ' '; // 0 1 10 2 3
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

| Container        | Random Access | Insert Front | Insert Back | Insert Middle | Iterator Invalidation |
|------------------|---------------|--------------|-------------|---------------|-----------------------|
| **vector**       | O(1) ✓        | O(n)         | O(1)*       | O(n)          | On reallocation       |
| **deque**        | O(1) ✓        | O(1) ✓       | O(1) ✓      | O(n)          | On middle insert      |
| **list**         | O(n)          | O(1) ✓       | O(1) ✓      | O(1)** ✓      | Never (except erased) |
| **forward_list** | O(n)          | O(1) ✓       | N/A         | O(1)** ✓      | Never (except erased) |
| **array**        | O(1) ✓        | N/A          | N/A         | N/A           | Never                 |

\* Amortized  
\*\* With iterator to position

---

## Making the Right Choice: A Decision Guide

Choosing the right container is one of the most important decisions in C++ 
programming. Here's a systematic approach:

### Start Here: The Decision Tree

```
Do you know the size at compile time?
├─ YES → Use std::array
└─ NO  → Continue...

Do you need to insert/remove from the middle frequently?
├─ YES → Use std::list (or std::deque if also need random access)
└─ NO  → Continue...

Do you need efficient operations at BOTH ends?
├─ YES → Use std::deque
└─ NO  → Continue...

Default choice → Use std::vector
```

### Real-World Scenarios

#### Scenario 1: Game Entity List

**Problem:** Managing game entities that are frequently created and destroyed

```cpp
// ❌ Bad: vector has O(n) removal
std::vector<Entity*> entities;
// When entity dies, must shift all remaining entities

// ✅ Better: list has O(1) removal with iterator
std::list<Entity*> entities;
// When entity dies, just unlink it - O(1)
```

#### Scenario 2: Task Queue

**Problem:** Processing tasks in order, adding at back, removing from front

```cpp
// ❌ Bad: vector is slow at front removal
std::vector<Task> tasks;
tasks.push_back(newTask);  // O(1) - good
tasks.erase(tasks.begin()); // O(n) - BAD!

// ✅ Good: deque is fast at both ends
std::deque<Task> tasks;
tasks.push_back(newTask);  // O(1)
tasks.pop_front();         // O(1)
```

#### Scenario 3: Fixed Configuration Array

**Problem:** Store exactly 4 connection endpoints, size never changes

```cpp
// ❌ Overkill: vector has unnecessary overhead
std::vector<Endpoint> endpoints(4);

// ✅ Perfect: array is zero-overhead
std::array<Endpoint, 4> endpoints;
```

#### Scenario 4: Dynamic Array with Frequent Access

**Problem:** Stock prices - constantly added, frequently accessed by index

```cpp
// ✅ Perfect: vector is ideal
std::vector<double> prices;
prices.reserve(1000);  // If you know approximate size
for (/* market open */) {
    prices.push_back(getCurrentPrice());
}
// Fast random access: prices[index]
```

### Performance Intuition

Understanding why operations have their complexity:

#### Vector: The Array Analogy

Think of vector like an apartment building:

- **Random access (O(1))**: Know room number? Go straight there
- **Push back (O(1)*)**: Add room at end - usually easy
- **Insert middle (O(n))**: Insert new room? Must renumber all rooms after it!
- **Reallocation**: Building full? Build bigger one, move everyone over

#### List: The Train Analogy

Think of list like train cars:

- **No random access**: Want car #50? Must walk through cars 1-49
- **Insert anywhere (O(1))**: Uncouple cars, insert new one, recouple
- **Search (O(n))**: Must walk through checking each car
- **Memory overhead**: Each car needs coupling mechanism (pointers)

#### Deque: The Expandable Array Analogy

Think of deque like multiple apartment buildings:

- **Random access (O(1))**: Know building and room? Go there
- **Push both ends (O(1))**: Add new building at either end
- **Insert middle (O(n))**: Still need to shift within buildings

### Memory Considerations

```cpp
// Memory layout visualization

// Vector - contiguous
RAM: [1][2][3][4][5] <- all together, cache-friendly

// List - scattered
RAM: ... [1→] ... [→2→] ... [→3→] ... [→4] ... 
     Each node has overhead of 2 pointers

// Array - stack allocated (if local)
Stack: [1][2][3][4][5] <- no heap allocation needed
```

**Rule of Thumb:**
- Vector: ~N bytes (just the elements)
- List: ~3N bytes (element + 2 pointers per node)
- Array: ~N bytes (just the elements)

### Common Mistakes to Avoid

#### Mistake 1: Using List When You Don't Need It

```cpp
// ❌ No benefit from list here
std::list<int> numbers;
for (int i = 0; i < 100; ++i) {
  numbers.push_back(i);  // Only adding at end
}
// Later: accessing by index requires O(n) traversal!

// ✅ Vector is perfect for this
std::vector<int> numbers;
numbers.reserve(100);
for (int i = 0; i < 100; ++i) {
  numbers.push_back(i);
}
// Fast random access with numbers[i]
```

#### Mistake 2: Not Reserving Vector Capacity

```cpp
// ❌ Multiple reallocations
std::vector<int> v;
for (int i = 0; i < 10000; ++i) {
  v.push_back(i);  // May reallocate many times
}

// ✅ Reserve upfront
std::vector<int> v;
v.reserve(10000);  // One allocation
for (int i = 0; i < 10000; ++i) {
  v.push_back(i);  // No reallocations
}
```

#### Mistake 3: Using Array for Dynamic Data

```cpp
// ❌ Can't change size
std::array<int, 100> data;
// What if I need 101 elements? Rewrite code!

// ✅ Use vector for dynamic sizes
std::vector<int> data;
data.reserve(100);  // Hint at size, but can grow
```

### Advanced Considerations

#### Cache Performance Matters

Modern CPUs love contiguous memory (vector, array) because:

1. **Prefetching**: CPU predicts you'll access next element
2. **Cache lines**: Load multiple adjacent elements at once
3. **Less pointer chasing**: No following pointers like in list

```cpp
// Fast - contiguous access
std::vector<int> vec(1000000);
for (auto& x : vec) {
  x *= 2;  // CPU can prefetch efficiently
}

// Slower - pointer chasing
std::list<int> lst(1000000, 0);
for (auto& x : lst) {
  x *= 2;  // Must follow pointers, cache misses
}
```

#### Iterator Invalidation Rules

Understanding when iterators become invalid is crucial:

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};
auto it = vec.begin() + 2;  // Points to 3

vec.push_back(6);  // ⚠️ May reallocate!
// 'it' is now potentially INVALID

// versus:

std::list<int> lst = {1, 2, 3, 4, 5};
auto it = lst.begin();
std::advance(it, 2);  // Points to 3

lst.push_back(6);  // ✅ No problem
// 'it' is still VALID
```

**Invalidation Summary:**

- **Vector**: Insert/delete invalidates all iterators after point of modification, push_back may invalidate all
- **Deque**: Insert/delete in middle invalidates all, insert/delete at ends only invalidates end iterators
- **List**: Only invalidates iterators to deleted elements
- **Array**: Never invalidates (fixed size)

## Practice Questions

<details><summary>1. When should you use `std::deque` instead of `std::vector`?</summary>

    Use `std::deque` when you need efficient insertion/removal at both front and back (O(1)). Prefer `std::vector` when you need contiguous storage and best cache locality.

</details>

<details><summary>2. Why doesn't `std::forward_list` provide a `size()` method?</summary>

    `std::forward_list` omits `size()` to avoid storing/counting elements (keeps operations and memory minimal); computing size would be O(n).

</details>

<details><summary>3. What's the time complexity of `std::list::splice()` for a single element?</summary>

    O(1) — splicing a single element relinks pointers without copying or traversing.

</details>

<details><summary>4. Which containers can be used as the underlying container for `std::stack`?</summary>

    Default is `std::deque`. You can also use `std::vector`, `std::list`, or any container offering `back`, `push_back`, and `pop_back`.

</details>

<details><summary>5. What happens to iterators when you insert an element into `std::list`?</summary>

    Iterators remain valid for all elements except those that are erased; inserting does not invalidate other iterators.

</details>

## Key Takeaways

✅ **Default to `vector`** for most use cases
✅ Use **`deque`** when you need efficient front/back operations
✅ Use **`list`** when you need stable iterators and middle insertion
✅ Use **`array`** when size is known at compile time
✅ Container adapters (**stack, queue, priority_queue**) restrict interface for specific use patterns

---

[← Back to Index](./README.md) | [Next: Module 2 - Associative Containers →](./module-2-associative-containers.md)
