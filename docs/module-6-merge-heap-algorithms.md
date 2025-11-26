# Module 6: Merge, Heap, Min/Max, and Set Algorithms

## Overview

**What This Module Covers:**

This module combines several algorithm families that work with sorted or partially sorted data:

1. **Merge Operations**: Combine sorted sequences efficiently
2. **Heap Operations**: Priority queue implementations
3. **Min/Max Operations**: Find extreme values
4. **Set Operations**: Mathematical set operations on sorted ranges

**Why These Are Grouped Together:**

They all operate on ordered data and are fundamental building blocks for more complex algorithms. Understanding these enables efficient data processing patterns.

**Key Insight: Sorted Data Enables Efficiency**

Many of these algorithms exploit the fact that data is sorted to achieve better-than-brute-force performance:

```cpp
// Finding common elements in unsorted data: O(n²)
for (auto& x : vec1) {
    for (auto& y : vec2) {
        if (x == y) common.push_back(x);
    }
}

// Finding common elements in sorted data: O(n + m)
std::set_intersection(vec1.begin(), vec1.end(),
                     vec2.begin(), vec2.end(),
                     std::back_inserter(common));
// Linear time because we can walk through both simultaneously!
```

**Understanding Heaps:**

A heap is a complete binary tree where each parent is greater than (max-heap) or less than (min-heap) its children:

```
Max-Heap Example:
        9
       / \
      7   8
     / \ / \
    3  5 6  2

Properties:
- Parent >= children (max-heap)
- Root is maximum element
- Can be stored in array: [9,7,8,3,5,6,2]
- Parent of i: (i-1)/2
- Left child of i: 2*i+1
- Right child of i: 2*i+2
```

📖 [cppreference: Sorting operations](https://en.cppreference.com/w/cpp/algorithm)

---

## Merge Operations

**Why Merging Matters:**

Merging is the heart of merge sort and is crucial for combining separately sorted datasets. It's O(n+m) - linear time!

**The Merge Process:**

```
v1: [1, 3, 5, 7]     v2: [2, 4, 6, 8]
     ↑                    ↑
   Compare: 1 vs 2 → take 1
   
result: [1, _, _, _, _, _, _, _]

v1: [1, 3, 5, 7]     v2: [2, 4, 6, 8]
        ↑                 ↑
   Compare: 3 vs 2 → take 2
   
result: [1, 2, _, _, _, _, _, _]

... continue until both exhausted ...

result: [1, 2, 3, 4, 5, 6, 7, 8]
```

### std::merge
**Merge two sorted ranges into one sorted output**

```cpp
#include <algorithm>
#include <vector>
#include <iterator>
#include <iostream>

int main() {
    std::vector<int> v1 = {1, 3, 5, 7, 9};
    std::vector<int> v2 = {2, 4, 6, 8, 10};
    std::vector<int> result(v1.size() + v2.size());
    
    // Merge into preallocated space
    std::merge(v1.begin(), v1.end(),
               v2.begin(), v2.end(),
               result.begin());
    // result: {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    
    // Or use back_inserter for dynamic sizing
    std::vector<int> result2;
    std::merge(v1.begin(), v1.end(),
               v2.begin(), v2.end(),
               std::back_inserter(result2));
    
    return 0;
}
```

**Key Points:**
- Both input ranges MUST be sorted
- Output range must have sufficient space (or use back_inserter)
- O(n + m) complexity - linear!
- Stable - preserves relative order from input ranges

**Real-World Use:**
```cpp
// Merging sorted log files from different servers
std::vector<LogEntry> server1_logs;  // Sorted by timestamp
std::vector<LogEntry> server2_logs;  // Sorted by timestamp

std::vector<LogEntry> all_logs;
std::merge(server1_logs.begin(), server1_logs.end(),
           server2_logs.begin(), server2_logs.end(),
           std::back_inserter(all_logs),
           [](const LogEntry& a, const LogEntry& b) {
               return a.timestamp < b.timestamp;
           });
// all_logs now in chronological order
```

📖 [cppreference: std::merge](https://en.cppreference.com/w/cpp/algorithm/merge)

### std::inplace_merge
**Merge two consecutive sorted ranges in-place**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    // Two sorted halves in one vector
    std::vector<int> vec = {1, 3, 5, 7, 2, 4, 6, 8};
    //                      [sorted 1][sorted 2]
    
    auto middle = vec.begin() + 4;
    std::inplace_merge(vec.begin(), middle, vec.end());
    // vec: {1, 2, 3, 4, 5, 6, 7, 8}
    
    return 0;
}
```

**When to Use:**
- Ranges are in same container
- Want to save memory (no extra array)
- Commonly used in merge sort implementation

**Vs. std::merge:**
- `merge`: Two separate inputs → separate output
- `inplace_merge`: One input with two sorted parts → same container
    
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

---

## Understanding Set Operations: The Mathematical View

**Set operations treat ranges as mathematical sets:**

```
v1 = {1, 2, 3, 4, 5}
v2 = {3, 4, 5, 6, 7}

Union (∪):        {1, 2, 3, 4, 5, 6, 7}  - Everything
Intersection (∩): {3, 4, 5}              - Common elements
Difference (−):   {1, 2}                 - In v1 but not v2
Sym. Diff. (⊕):   {1, 2, 6, 7}          - In one but not both
```

**Critical Requirement: BOTH RANGES MUST BE SORTED!**

```cpp
// ❌ WRONG - undefined behavior on unsorted data
std::vector<int> v1 = {5, 1, 3};  // Not sorted!
std::vector<int> v2 = {3, 2, 4};  // Not sorted!
std::vector<int> result;
std::set_intersection(v1.begin(), v1.end(), 
                     v2.begin(), v2.end(),
                     std::back_inserter(result));
// Result is WRONG - may miss elements or include wrong ones

// ✅ CORRECT - sort first
std::sort(v1.begin(), v1.end());
std::sort(v2.begin(), v2.end());
std::set_intersection(v1.begin(), v1.end(), 
                     v2.begin(), v2.end(),
                     std::back_inserter(result));
// Now reliable: {3}
```

## Understanding Heaps: The Complete Picture

**What is a Heap?**

A heap is a binary tree stored in an array where parent elements follow a specific relationship with children:

```
Max-Heap (Parent >= Children):
        9
       / \
      7   8
     / \ / \
    3  5 6  2
   / \
  1   4

Array: [9, 7, 8, 3, 5, 6, 2, 1, 4]
Index:  0  1  2  3  4  5  6  7  8

For element at index i:
- Parent: (i-1)/2
- Left child: 2*i + 1
- Right child: 2*i + 2

Example: Element at index 4 (value 5)
- Parent: (4-1)/2 = 1 (value 7) ✓ 7 >= 5
- Left child: 2*4+1 = 9 (out of bounds)
- Right child: 2*4+2 = 10 (out of bounds)
```

**Why Heaps?**

Heaps are the backbone of priority queues:
- O(1) access to max/min element
- O(log n) insertion and deletion
- Efficient sorting (heapsort)

**Heap vs. Sorted Array:**

```
Operation       | Heap      | Sorted Array
----------------|-----------|-------------
Get max/min     | O(1)      | O(1)
Insert          | O(log n)  | O(n) - must shift
Delete max/min  | O(log n)  | O(n) - must shift
Build from data | O(n)      | O(n log n) - sort

Use heap when: Frequent insertions/deletions, only need max/min
Use sorted when: Rarely change data, need all sorted
```

## Algorithm Selection Guide

### Decision Tree

```
What do you need to do?

COMBINE sorted sequences
├─ Two separate containers? → std::merge
├─ Two parts of same container? → std::inplace_merge
└─ Need mathematical set operation? → (see below)

SET OPERATIONS (on sorted data)
├─ Elements in either? → std::set_union
├─ Elements in both? → std::set_intersection
├─ Elements in first but not second? → std::set_difference
├─ Elements in one but not both? → std::set_symmetric_difference
└─ Check if one is subset of another? → std::includes

PRIORITY QUEUE (heaps)
├─ Need max element repeatedly? → make_heap + pop_heap
├─ Need min element repeatedly? → make_heap with std::greater
├─ Building from scratch? → make_heap
└─ Adding elements dynamically? → push_heap

FIND EXTREMES
├─ Just need minimum? → std::min_element
├─ Just need maximum? → std::max_element
└─ Need both? → std::minmax_element (more efficient)
```

### Real-World Scenarios

#### Scenario 1: Event Stream Merging
**Problem:** Merge event logs from multiple sources by timestamp

```cpp
struct Event {
    std::time_t timestamp;
    std::string message;
    std::string source;
};

std::vector<Event> server1_events;  // Sorted by timestamp
std::vector<Event> server2_events;  // Sorted by timestamp
std::vector<Event> server3_events;  // Sorted by timestamp

// Merge all chronologically
std::vector<Event> all_events;

// First merge two
std::merge(server1_events.begin(), server1_events.end(),
           server2_events.begin(), server2_events.end(),
           std::back_inserter(all_events),
           [](const Event& a, const Event& b) {
               return a.timestamp < b.timestamp;
           });

// Then merge with third
std::vector<Event> final_events;
std::merge(all_events.begin(), all_events.end(),
           server3_events.begin(), server3_events.end(),
           std::back_inserter(final_events),
           [](const Event& a, const Event& b) {
               return a.timestamp < b.timestamp;
           });
```

#### Scenario 2: Finding Common Users
**Problem:** Find users who visited both websites

```cpp
std::vector<std::string> site1_visitors = {"alice", "bob", "charlie", "david"};
std::vector<std::string> site2_visitors = {"bob", "charlie", "eve", "frank"};

// Both must be sorted
std::sort(site1_visitors.begin(), site1_visitors.end());
std::sort(site2_visitors.begin(), site2_visitors.end());

std::vector<std::string> both_sites;
std::set_intersection(site1_visitors.begin(), site1_visitors.end(),
                     site2_visitors.begin(), site2_visitors.end(),
                     std::back_inserter(both_sites));
// both_sites: {"bob", "charlie"}

// Find users who visited only site1
std::vector<std::string> only_site1;
std::set_difference(site1_visitors.begin(), site1_visitors.end(),
                   site2_visitors.begin(), site2_visitors.end(),
                   std::back_inserter(only_site1));
// only_site1: {"alice", "david"}
```

#### Scenario 3: Task Priority Queue
**Problem:** Process tasks by priority, with highest priority first

```cpp
struct Task {
    int priority;
    std::string name;
    
    bool operator<(const Task& other) const {
        return priority < other.priority;  // Max-heap by priority
    }
};

std::vector<Task> tasks = {
    {3, "Low priority"},
    {1, "Lowest"},
    {5, "Highest"},
    {4, "High"},
    {2, "Medium"}
};

// Create max-heap
std::make_heap(tasks.begin(), tasks.end());

// Process tasks in priority order
while (!tasks.empty()) {
    // Get highest priority task
    Task current = tasks.front();
    std::cout << "Processing: " << current.name 
              << " (priority " << current.priority << ")\n";
    
    // Remove from heap
    std::pop_heap(tasks.begin(), tasks.end());
    tasks.pop_back();
}

// Output:
// Processing: Highest (priority 5)
// Processing: High (priority 4)
// Processing: Low priority (priority 3)
// Processing: Medium (priority 2)
// Processing: Lowest (priority 1)
```

#### Scenario 4: Top-K Elements with Heap
**Problem:** Find top 10 scores from stream of scores

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

std::vector<int> findTopK(const std::vector<int>& scores, int k) {
    std::vector<int> topK(scores.begin(), scores.begin() + k);
    
    // Make min-heap (smallest at top)
    std::make_heap(topK.begin(), topK.end(), std::greater<int>());
    
    // Process remaining scores
    for (size_t i = k; i < scores.size(); ++i) {
        if (scores[i] > topK.front()) {
            // Replace smallest in top-k
            std::pop_heap(topK.begin(), topK.end(), std::greater<int>());
            topK.back() = scores[i];
            std::push_heap(topK.begin(), topK.end(), std::greater<int>());
        }
    }
    
    // Sort for nice output
    std::sort_heap(topK.begin(), topK.end(), std::greater<int>());
    std::reverse(topK.begin(), topK.end());
    
    return topK;
}

int main() {
    std::vector<int> scores = {85, 92, 78, 95, 88, 91, 76, 98, 82, 89, 93, 87};
    auto top5 = findTopK(scores, 5);
    
    // top5: {98, 95, 93, 92, 91}
    for (int score : top5) {
        std::cout << score << " ";
    }
    std::cout << '\n';
    
    return 0;
}
```

### Common Mistakes and Solutions

#### Mistake 1: Forgetting to Sort Before Set Operations

```cpp
// ❌ WRONG - random results
std::vector<int> v1 = {5, 2, 8, 1};
std::vector<int> v2 = {3, 1, 7, 2};
std::vector<int> result;

std::set_union(v1.begin(), v1.end(),
               v2.begin(), v2.end(),
               std::back_inserter(result));
// Result is UNDEFINED - might be anything!

// ✅ CORRECT - sort first
std::sort(v1.begin(), v1.end());
std::sort(v2.begin(), v2.end());
std::set_union(v1.begin(), v1.end(),
               v2.begin(), v2.end(),
               std::back_inserter(result));
// Result: {1, 2, 3, 5, 7, 8}
```

#### Mistake 2: Confusing Heap Operations Order

```cpp
std::vector<int> vec = {3, 1, 4, 1, 5};

// ❌ WRONG - pop_heap before make_heap
std::pop_heap(vec.begin(), vec.end());  // Undefined! Not a heap yet

// ✅ CORRECT - make_heap first
std::make_heap(vec.begin(), vec.end());
std::pop_heap(vec.begin(), vec.end());
vec.pop_back();  // Actually remove

// ❌ WRONG - accessing after pop_heap without pop_back
std::make_heap(vec.begin(), vec.end());
std::pop_heap(vec.begin(), vec.end());  // Max moved to end
std::cout << vec.front();  // NOT the max anymore!

// ✅ CORRECT - pop_back to actually remove
std::make_heap(vec.begin(), vec.end());
std::pop_heap(vec.begin(), vec.end());
vec.pop_back();  // Now truly removed
std::cout << vec.front();  // New maximum
```

#### Mistake 3: Using set_difference Wrong Way

```cpp
std::vector<int> v1 = {1, 2, 3, 4, 5};
std::vector<int> v2 = {3, 4, 5, 6, 7};

// Order matters!
std::vector<int> result1, result2;

std::set_difference(v1.begin(), v1.end(),
                   v2.begin(), v2.end(),
                   std::back_inserter(result1));
// result1: {1, 2} - in v1 but not v2

std::set_difference(v2.begin(), v2.end(),
                   v1.begin(), v1.end(),
                   std::back_inserter(result2));
// result2: {6, 7} - in v2 but not v1

// ❌ WRONG - thinking it's symmetric
// set_difference(A, B) != set_difference(B, A)

// ✅ For symmetric difference, use:
std::vector<int> sym_diff;
std::set_symmetric_difference(v1.begin(), v1.end(),
                             v2.begin(), v2.end(),
                             std::back_inserter(sym_diff));
// sym_diff: {1, 2, 6, 7}
```

#### Mistake 4: Not Reserving Space for merge

```cpp
std::vector<int> v1 = {1, 3, 5};
std::vector<int> v2 = {2, 4, 6};

// ❌ WRONG - not enough space
std::vector<int> result(3);  // Only 3 elements!
std::merge(v1.begin(), v1.end(),
           v2.begin(), v2.end(),
           result.begin());  // Undefined behavior - writes past end!

// ✅ CORRECT - reserve enough space
std::vector<int> result(v1.size() + v2.size());
std::merge(v1.begin(), v1.end(),
           v2.begin(), v2.end(),
           result.begin());

// ✅ BETTER - use back_inserter
std::vector<int> result;
std::merge(v1.begin(), v1.end(),
           v2.begin(), v2.end(),
           std::back_inserter(result));
```

### Understanding Multiset Semantics

**Set algorithms preserve duplicates as multisets:**

```cpp
std::vector<int> v1 = {1, 1, 2, 3, 3, 3};  // Sorted with duplicates
std::vector<int> v2 = {1, 2, 2, 3, 3};     // Sorted with duplicates

// Union: max(count1, count2) for each element
std::vector<int> u;
std::set_union(v1.begin(), v1.end(), v2.begin(), v2.end(),
               std::back_inserter(u));
// Result: {1, 1, 2, 2, 3, 3, 3}
// Explanation:
// - 1 appears 2 times in v1, 1 time in v2 → max = 2
// - 2 appears 1 time in v1, 2 times in v2 → max = 2
// - 3 appears 3 times in v1, 2 times in v2 → max = 3

// Intersection: min(count1, count2) for each element
std::vector<int> i;
std::set_intersection(v1.begin(), v1.end(), v2.begin(), v2.end(),
                     std::back_inserter(i));
// Result: {1, 2, 3, 3}
// Explanation:
// - 1 appears 2 times in v1, 1 time in v2 → min = 1
// - 2 appears 1 time in v1, 2 times in v2 → min = 1
// - 3 appears 3 times in v1, 2 times in v2 → min = 2

// Difference: max(0, count1 - count2) for each element
std::vector<int> d;
std::set_difference(v1.begin(), v1.end(), v2.begin(), v2.end(),
                   std::back_inserter(d));
// Result: {1, 3}
// Explanation:
// - 1: 2 - 1 = 1 occurrence
// - 2: 1 - 2 = -1 → 0 occurrences
// - 3: 3 - 2 = 1 occurrence
```

### Performance Analysis

**Time Complexities:**

| Operation | Complexity | Notes |
|-----------|------------|-------|
| merge | O(n + m) | Linear in total size |
| inplace_merge | O(n log n)* | *O(n) with extra memory |
| set_union | O(n + m) | Linear scan |
| set_intersection | O(n + m) | Linear scan |
| set_difference | O(n + m) | Linear scan |
| set_symmetric_difference | O(n + m) | Linear scan |
| includes | O(n + m) | Can exit early |
| make_heap | O(n) | Surprisingly linear! |
| push_heap | O(log n) | Bubble up |
| pop_heap | O(log n) | Bubble down |
| min_element | O(n) | Must check all |
| max_element | O(n) | Must check all |
| minmax_element | O(n) | Single pass for both |

**Space Complexities:**

- merge: O(n + m) output space
- inplace_merge: O(1) or O(n) depending on implementation
- Set operations: O(result size) for output
- Heap operations: O(1) - in-place
- Min/max: O(1) - just iterators

**Why is make_heap O(n)?**

This surprises many! Building a heap from scratch is faster than n insertions:

```cpp
// Method 1: Repeated insertion - O(n log n)
std::vector<int> heap;
for (int x : data) {
    heap.push_back(x);
    std::push_heap(heap.begin(), heap.end());  // Each O(log n)
}

// Method 2: Build at once - O(n)
std::vector<int> heap = data;
std::make_heap(heap.begin(), heap.end());  // Only O(n)!
```

make_heap uses a clever bottom-up approach that processes smaller subtrees first, resulting in linear time.

## Key Takeaways

✅ **All set operations** require **sorted** input  
✅ **merge** is stable and preserves all duplicates  
✅ Set operations use **multiset semantics** for duplicates  
✅ **Heap operations** maintain heap property in O(log n)  
✅ **min/max_element** return **iterators**, not values

---

[← Previous: Module 5](./module-5-sorting-algorithms.md) | [Back to Index](./README.md) | [Next: Module 7 →](./module-7-functional-utilities.md)

