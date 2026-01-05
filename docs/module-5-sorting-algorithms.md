# Module 5: Sorting and Binary Search

## Overview

### What Makes Sorting Special?

Sorting is one of the most fundamental operations in computer science. Once 
data is sorted, many other operations become dramatically faster - searching 
changes from O(n) to O(log n), finding duplicates becomes trivial, and range 
queries are possible.

### The Big Picture

```text
Unsorted data: [3, 1, 4, 1, 5, 9, 2, 6]
- Finding 5: Must check each element (`O(n)``)
- Finding duplicates: Must compare all pairs (`O(n²)`)
- Range queries: Must scan everything (`O(n)`)

Sorted data: [1, 1, 2, 3, 4, 5, 6, 9]
- Finding 5: Binary search (`O(log n)`)
- Finding duplicates: Check adjacent elements (`O(n)`)
- Range queries: Find start and end (`O(log n)`)
```

### Critical Concept: Strict Weak Ordering

This is THE most important concept for sorting. Your comparator MUST satisfy 
these rules, or you get undefined behavior:

1. **Irreflexivity**: `comp(a, a)` must be false, nothing is less than itself

2. **Asymmetry**: If `comp(a, b)` is true, then `comp(b, a)` must be false, 
   i.e. if a < b, then b is not < a

3. **Transitivity**: If `comp(a, b)` and `comp(b, c)`, then `comp(a, c)`, i.e.
   if a < b and b < c, then a < c

4. **Equivalence Transitivity**: If a == b and b == c, then a == c, i.e. 
   equality is transitive

### Common Violations (Bugs!)

```cpp
// ❌ WRONG - violates irreflexivity
[](int a, int b) { return a <= b; }  // a <= a is true!

// ❌ WRONG - violates transitivity
// Comparing strings by first letter only
[](const string& a, const string& b) { return a[0] < b[0]; }
// "apple" < "banana" (a < b) ✓
// "banana" < "berry" (b < b) ✗ - not transitive!

// ✅ CORRECT
[](int a, int b) { return a < b; }
```

### The Sorting Family

| Algorithm      | Stable? | Complexity | Use When                                 |
|----------------|---------|------------|------------------------------------------|
| `sort`         | No      | O(n log n) | Default choice - fastest                 |
| `stable_sort`  | Yes     | O(n log n) | Need to preserve order of equal elements |
| `partial_sort` | No      | O(n log k) | Only need top k elements                 |
| `nth_element`  | No      | O(n) avg   | Only need element at position n          |

📖 [cppreference: Sorting operations](https://en.cppreference.com/w/cpp/algorithm)

---

## Sorting Algorithms

### `std::sort`

- Unstable sort (uses introsort, hybrid of quicksort, heapsort, and 
  insertion sort).
- O(n log n) average
- Default choice, typically 2-3x faster than `std::stable_sort`

#### What "Unstable" Means

There is no guarantee that comparing elements as equal will maintain their 
original relative order. An algorithm is stable if equal elements keep their 
relative ordering.

```cpp
struct Person {
    std::string name;
    int age;
};

std::vector<Person> people = {
    {"Alice", 25},
    {"Bob", 25},    // Same age as Alice
    {"Charlie", 30}
};

// Sort by age (unstable)
std::sort(people.begin(), people.end(),
    [](const Person& a, const Person& b) { return a.age < b.age; });

// Alice and Bob might swap order! (both age 25)
// Result could be: {Bob, Alice, Charlie} or {Alice, Bob, Charlie}
// No guarantee which comes first
```

The best way to make sort behave is to create a custom comparator that adds 
a tie-breaker, e.g. by age then by name.

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {3, 1, 4, 1, 5, 9, 2, 6};
    
    // Sort ascending (default: uses operator<)
    std::sort(vec.begin(), vec.end());
    // vec: {1, 1, 2, 3, 4, 5, 6, 9}
    
    // Sort descending (use std::greater)
    std::sort(vec.begin(), vec.end(), std::greater<int>());
    // vec: {9, 6, 5, 4, 3, 2, 1, 1}
    
    // Custom comparator - sort by length
    std::vector<std::string> words = {"apple", "pie", "zoo", "a"};
    std::sort(words.begin(), words.end(),
              [](const std::string& a, const std::string& b) {
                  return a.length() < b.length();  // ✅ Correct: strict weak ordering
              });
    // words: {"a", "pie", "zoo", "apple"}
    
    // Complex example: sort by multiple criteria
    struct Person {
        std::string name;
        int age;
    };
    
    std::vector<Person> people = {
        {"Alice", 30},
        {"Bob", 25},
        {"Charlie", 30},
        {"David", 25}
    };
    
    // Sort by age first, then by name
    std::sort(people.begin(), people.end(),
        [](const Person& a, const Person& b) {
            if (a.age != b.age) {
                return a.age < b.age;  // Sort by age first
            }
            return a.name < b.name;     // If ages equal, sort by name
        });
    // Result: {Bob, David, Alice, Charlie}
    //         (25) (25)   (30)   (30)
    
    return 0;
}
```

**When to Use:**

- ✅ General-purpose sorting
- ✅ Don't need stable order
- ✅ Want fastest possible sort

**When NOT to Use:**

- ❌ Need to preserve relative order of equal elements (use `stable_sort`)
- ❌ Only need partial results (use `partial_sort`)
- ❌ Only need nth element (use `nth_element`)

📖 [cppreference: std::sort](https://en.cppreference.com/w/cpp/algorithm/sort)

### `std::stable_sort`

`std::stable_sort` sorts the date and preserves relative order of equal 
elements. It typically uses merge sort, performing from the bottom up. When 
extra memory can be allocated (`O(n)` temp buffer), complexity is `O(n × log
(n))`. Without extra memory, it uses in-place merge sort variant, and takes 
`O(n × log²(n))` time.

```cpp
struct Email {
    std::string sender;
    std::time_t timestamp;
};

std::vector<Email> inbox = {
    {"alice@ex.com", 1000},
    {"bob@ex.com", 1001},
    {"alice@ex.com", 1002},  // Later email from Alice
    {"charlie@ex.com", 1003}
};

// Emails already sorted by time
// Now sort by sender, but keep time order within each sender

std::stable_sort(inbox.begin(), inbox.end(),
    [](const Email& a, const Email& b) { return a.sender < b.sender; });

// Result: Alice's emails still in time order!
// {alice@ex.com:1000, alice@ex.com:1002, bob@ex.com:1001, charlie@ex.com:1003}
//  ↑ Earlier           ↑ Later
```

📖 [cppreference: std::stable_sort](https://en.cppreference.com/w/cpp/algorithm/stable_sort)

### `std::partial_sort`

Sort only the first n elements of a range, leaving the rest in an 
unspecified order, i.e. elements in `[first, middle)` are sorted, and `[middle, 
last)` are in an unspecified order. `std::partial_sort` (without custom 
comparator) guarantees that the first n elements are the smallest elements 
from **the entire original range**, and every element in `[middle, end)` is >= 
every element in `[first, middle)`. The complexity is `O(n × log(k))`, where 
k is the number of elements to sort. Typically uses a heap-based algorithm, 
e.g. max-heap,  

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

### `std::nth_element`

Rearranges elements so that the element at position n is the element 
that would be there if the range were fully sorted and partitions the 
range around it. Faster than partial sorting when you only need partitioning,
not full sorting. Complexity is `O(n)` on average. Typically uses 
Introselect, which is based on Quickselect and falls back to 
median-of-medians if recursion gets too deep. `std::nth_element` is unstable,
so equal elements may not maintain their relative order. It is a **selection 
algorithm**, not a sorting algorithm.

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {7, 2, 9, 1, 5, 3, 8, 4, 6};
    
    std::nth_element(v.begin(), v.begin() + 4, v.end());
    // v might be: {2, 1, 3, 4, 5, 9, 8, 7, 6}
    //              ^  <= 5  ^  5  ^  >= 5  ^
    
    std::cout << v[4] << std::endl; // 5
    // Guarantees:
    // 1. v[4] == 5 (the 5th smallest element, 0-indexed)
    // 2. All elements before v[4] are <= 5
    // 3. All elements after v[4] are >= 5
    // 4. No sorting within the partitions
    
    return 0;
}
```

**When to use:**

- ✅ Finding median, percentiles, quartiles.
- ✅ Need to partition around a specific position.
- ✅ Only care about partitioning, not sorting.

📖 [cppreference: std::nth_element](https://en.cppreference.com/w/cpp/algorithm/nth_element)

---

## `std::binary_search`

Binary search checks whether a value exists within a given **sorted** range, 
and returns a bool. It doesn't tell you where the element is, just that it 
exists. The range must be sorted or at least partitioned with respect to the 
sought value. When using a custom comparator, the comparator must match the 
sorting order. Complexity is `O(log(n))`.

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

Use `std::binary_search` when:

- ✅ You only need to know if an element exists (yes/no).
- ✅ Data is already sorted.
- ✅ You're doing many lookups on the same sorted data.

Don't use `std::binary_search` when:

- ❌ You need the position of the element (use lower_bound).
- ❌ You need to count occurrences (use equal_range).
- ❌ Data is unsorted and you'll only search once (just use find).
- ❌ You need frequent insertions/deletions (use std::set instead).

📖 [cppreference: std::binary_search](https://en.cppreference.com/w/cpp/algorithm/binary_search)

### `std::lower_bound`

Returns an iterator to the first position in a **sorted range** where a value
greater than or equal to the target could be inserted while maintaining sorted 
order. The iterator points to the first element **greater than or equal to** 
the target value, so will handle duplicates. Complexity is `O(log(n))` random access iterators.

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

If the value is not in the range, will return an iterator based on where the 
value would go:

```cpp
std::vector<int> v = {1, 2, 3, 5, 8, 13};

auto it = std::lower_bound(v.begin(), v.end(), 7);
// it points to 8 (first element >= 7)
// 7 is NOT in the vector, but this is where it would go

auto it2 = std::lower_bound(v.begin(), v.end(), 0);
// it2 == v.begin() (would insert at beginning)

auto it3 = std::lower_bound(v.begin(), v.end(), 20);
// it3 == v.end() (would insert at end)
```

Use `std::lower_bound` when:

- ✅ Checking if an element exists.
- ✅ Finding the first occurrence in a sorted range.
- ✅ Inserting before duplicates.
- ✅ Finding where to insert to maintain sorted order.
- ✅ Need the position of an element.

📖 [cppreference: std::lower_bound](https://en.cppreference.com/w/cpp/algorithm/lower_bound)

### std::upper_bound

Returns an iterator to the first position in a **sorted range** where a value
greater than the target could be inserted while maintaining sorted order. 
The iterator points to the first element **greater than** the target value, 
so will skip duplicates. Returns `end()` when the value is not in the range. 
Complexity is `O(log(n))` for random access iterators.

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

When an element doesn't exist in the range, both `std::lower_bound` and 
`std::upper_bound` will point to the same position.

Use `std::upper_bound` when:

- ✅ Finding the position after all duplicates.
- ✅ Inserting after duplicates.
- ✅ Need the end of a range of equal elements.

📖 [cppreference: std::upper_bound](https://en.cppreference.com/w/cpp/algorithm/upper_bound)

### `std::equal_range`

Returns `std::pair<Iterator, Iterator>` with [`std::lower_bound`, 
`std::upper_bound`] representing the range of all elements equal to a given 
value in a **sorted range**. More efficient than using `std::lower_bound` + 
`std::upper_bound` because it can optimize the search to avoid redundant 
work. Complexity is `O(log(n)` time.

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

Use equal_range when:

- ✅ You need to count occurrences efficiently.
- ✅ You want to process all elements equal to a value.
- ✅ You need both lower and upper bounds.
- ✅ You're removing/replacing all occurrences.

📖 [cppreference: std::equal_range](https://en.cppreference.com/w/cpp/algorithm/equal_range)

---

## Checking Sorted Order

### `std::is_sorted` vs. `std::is_sorted_until`

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

---

## Understanding Binary Search Requirements

**The Golden Rule: Data MUST Be Sorted!**

Binary search algorithms only work correctly on sorted data. Using them on unsorted data gives wrong results (not errors!).

```cpp
std::vector<int> unsorted = {5, 2, 8, 1, 9};

// ❌ WRONG RESULT - not sorted!
bool found = std::binary_search(unsorted.begin(), unsorted.end(), 2);
// Might return false even though 2 exists!

// ✅ CORRECT - sort first
std::sort(unsorted.begin(), unsorted.end());
bool found = std::binary_search(unsorted.begin(), unsorted.end(), 2);
// Returns true
```

**How Binary Search Works:**

```
Sorted array: [1, 2, 3, 4, 5, 6, 7, 8, 9]
Find 6:

Step 1: Check middle (5)
        [1, 2, 3, 4, 5] | [6, 7, 8, 9]
        6 > 5, search right half →

Step 2: Check middle of right (7)
        [6] | [7, 8, 9]
        6 < 7, search left half →

Step 3: Check [6]
        Found!

Only 3 comparisons instead of 9!
```

## Sorting Algorithm Selection Guide

### Decision Tree

```
What do you need?

FULLY SORTED array
├─ Don't need stable? → std::sort (fastest)
└─ Need stable? → std::stable_sort

PARTIALLY SORTED
├─ Need first k elements sorted? → std::partial_sort
└─ Need element at position k? → std::nth_element (fastest)

CHECK IF SORTED
├─ Boolean check? → std::is_sorted
└─ Find where it stops being sorted? → std::is_sorted_until

SEARCH IN SORTED DATA  
├─ Does element exist? → std::binary_search
├─ Find position? → std::lower_bound / std::upper_bound
└─ Find range of equal elements? → std::equal_range
```

### Real-World Scenarios

#### Scenario 1: Top-K Elements
**Problem:** Find top 10 scores from 1 million scores

```cpp
std::vector<int> scores(1'000'000);
// ... fill with scores ...

// ❌ SLOW - sorts everything
std::sort(scores.begin(), scores.end(), std::greater<int>());
auto top10 = std::vector<int>(scores.begin(), scores.begin() + 10);
// Time: O(n log n) for n=1,000,000

// ✅ FAST - only sorts top 10
std::partial_sort(scores.begin(), scores.begin() + 10, scores.end(),
                 std::greater<int>());
auto top10 = std::vector<int>(scores.begin(), scores.begin() + 10);
// Time: O(n log k) for k=10 - MUCH faster!
```

#### Scenario 2: Finding Median
**Problem:** Find median value in large dataset

```cpp
std::vector<int> data = {5, 2, 9, 1, 7, 6, 3};

// ❌ OVERKILL - sorts everything
std::sort(data.begin(), data.end());
int median = data[data.size() / 2];
// O(n log n)

// ✅ OPTIMAL - only positions median correctly
std::nth_element(data.begin(), data.begin() + data.size()/2, data.end());
int median = data[data.size() / 2];
// O(n) average - much faster for large datasets!
```

#### Scenario 3: Checking Duplicates in Sorted Data
**Problem:** Find if array has duplicates

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

// Method 1: Use set (O(n log n))
std::set<int> unique(numbers.begin(), numbers.end());
bool has_duplicates = (unique.size() != numbers.size());

// Method 2: Sort + adjacent check (O(n log n) + O(n))
std::sort(numbers.begin(), numbers.end());
bool has_duplicates = std::adjacent_find(numbers.begin(), numbers.end()) 
                     != numbers.end();

// Method 3: If already sorted, just check adjacent
if (std::is_sorted(numbers.begin(), numbers.end())) {
    bool has_duplicates = std::adjacent_find(numbers.begin(), numbers.end())
                         != numbers.end();  // O(n) only!
}
```

#### Scenario 4: Maintaining Sorted Insertion
**Problem:** Keep vector sorted as elements are added

```cpp
std::vector<int> sorted_vec;

void insert_sorted(int value) {
    // Find insertion point - O(log n)
    auto it = std::lower_bound(sorted_vec.begin(), sorted_vec.end(), value);
    
    // Insert at correct position - O(n) due to shifting
    sorted_vec.insert(it, value);
    
    // Note: For frequent insertions, consider std::set instead!
    // Set insertion is O(log n) without shifting
}

// Better alternative for many insertions:
std::set<int> sorted_set;
sorted_set.insert(value);  // O(log n) with no shifting
```

### Common Mistakes with Comparators

#### Mistake 1: Using <= Instead of <

```cpp
// ❌ UNDEFINED BEHAVIOR - violates strict weak ordering
std::sort(vec.begin(), vec.end(), 
    [](int a, int b) { return a <= b; });
// Problem: comp(a, a) returns true (violates irreflexivity)

// ✅ CORRECT
std::sort(vec.begin(), vec.end(),
    [](int a, int b) { return a < b; });
```

#### Mistake 2: Inconsistent Comparison

```cpp
struct Person {
    std::string first, last;
    int age;
};

// ❌ WRONG - inconsistent logic
auto comp = [](const Person& a, const Person& b) {
    if (rand() % 2) return a.age < b.age;
    else return a.first < b.first;
    // Violates transitivity!
};

// ✅ CORRECT - deterministic, transitive
auto comp = [](const Person& a, const Person& b) {
    if (a.age != b.age) return a.age < b.age;
    if (a.first != b.first) return a.first < b.first;
    return a.last < b.last;
};
```

#### Mistake 3: Binary Search on Unsorted Data

```cpp
std::vector<int> vec = {5, 2, 8, 1, 9};

// ❌ WRONG RESULTS - data not sorted!
if (std::binary_search(vec.begin(), vec.end(), 2)) {
    // Might not find 2 even though it exists!
}

// ✅ CORRECT - sort first
std::sort(vec.begin(), vec.end());
if (std::binary_search(vec.begin(), vec.end(), 2)) {
    // Now reliable
}

// Or use non-sorted search:
if (std::find(vec.begin(), vec.end(), 2) != vec.end()) {
    // Works on unsorted data, but O(n) instead of O(log n)
}
```

### Performance Comparison

| Algorithm | Best | Average | Worst | Stable? | Use Case |
|-----------|------|---------|-------|---------|----------|
| sort | O(n log n) | O(n log n) | O(n log n) | No | General sorting |
| stable_sort | O(n log n) | O(n log n) | O(n log² n) | Yes | Preserve order |
| partial_sort | O(n log k) | O(n log k) | O(n log k) | No | Top k elements |
| nth_element | O(n) | O(n) | O(n²)* | No | Median, percentiles |
| binary_search | O(log n) | O(log n) | O(log n) | N/A | Existence check |
| lower_bound | O(log n) | O(log n) | O(log n) | N/A | Insert position |

*Typically O(n) average with good implementations

### Understanding lower_bound vs upper_bound

**This confuses everyone at first!**

```cpp
std::vector<int> vec = {1, 2, 2, 2, 3, 4, 5};
//                       0  1  2  3  4  5  6

// lower_bound: First element >= value
auto it1 = std::lower_bound(vec.begin(), vec.end(), 2);
std::cout << (it1 - vec.begin());  // 1 (first 2)

// upper_bound: First element > value  
auto it2 = std::upper_bound(vec.begin(), vec.end(), 2);
std::cout << (it2 - vec.begin());  // 4 (first element after 2s)

// equal_range: Pair of lower_bound and upper_bound
auto [lower, upper] = std::equal_range(vec.begin(), vec.end(), 2);
std::cout << (upper - lower);  // 3 (count of 2s)

// Visual:
//        [1, 2, 2, 2, 3, 4, 5]
//            ↑        ↑
//         lower    upper
//         (first >=) (first >)
```

**Practical Use:**

```cpp
// Insert value while keeping sorted
void insert_sorted(std::vector<int>& vec, int value) {
    auto it = std::lower_bound(vec.begin(), vec.end(), value);
    vec.insert(it, value);
}

// Count occurrences in sorted vector
int count_in_sorted(const std::vector<int>& vec, int value) {
    auto [lower, upper] = std::equal_range(vec.begin(), vec.end(), value);
    return upper - lower;
}

// Find all elements in range [a, b]
auto lower = std::lower_bound(vec.begin(), vec.end(), a);
auto upper = std::upper_bound(vec.begin(), vec.end(), b);
std::vector<int> range(lower, upper);
```

## Key Takeaways

✅ **sort** is fastest, **stable_sort** preserves order  
✅ **Binary search** requires **sorted** input  
✅ **lower_bound** = first >=, **upper_bound** = first >  
✅ **nth_element** is O(n) for finding kth element  
✅ **Comparators** must satisfy strict weak ordering

---

[← Previous: Module 4](./module-4-modifying-operations.md) | [Back to Index](./README.md) | [Next: Module 6 →](./module-6-merge-heap-algorithms.md)

