# Module 2: Associative Containers

## Overview

**What are Associative Containers?**

Unlike sequence containers that store elements by position, associative containers organize elements by **keys**. This enables lightning-fast lookups - instead of searching through every element, these containers use sophisticated data structures to find elements in logarithmic time.

**The Two Families:**

1. **Ordered Containers** (set, map, multiset, multimap)
   - Implemented as **red-black trees** (balanced binary search trees)
   - Elements always stay sorted by key
   - Guaranteed O(log n) operations
   - Predictable iteration order

2. **Unordered Containers** (unordered_set, unordered_map, etc.)
   - Implemented as **hash tables**
   - Elements stored by hash value (no sorting)
   - Average O(1) operations, worst case O(n)
   - No guaranteed iteration order

**Key vs Value Containers:**

- **Set containers**: Store only keys (the value IS the key)
- **Map containers**: Store key-value pairs (dictionary/associative array)

**Unique vs Multi:**

- **set/map**: Each key appears at most once
- **multiset/multimap**: Keys can appear multiple times

**Why Use Associative Containers?**

```cpp
// Finding in vector: O(n) - must check every element
std::vector<int> vec = {1, 5, 3, 9, 2, 7};
auto it = std::find(vec.begin(), vec.end(), 7);  // Checks up to 6 elements

// Finding in set: O(log n) - binary search in tree
std::set<int> s = {1, 5, 3, 9, 2, 7};
auto it = s.find(7);  // Checks only ~log₂(6) ≈ 2-3 nodes
```

## 📚 Contents

- [Ordered Associative Containers](#ordered-associative-containers)
  - [std::set](#stdset)
  - [std::multiset](#stdmultiset)
  - [std::map](#stdmap)
  - [std::multimap](#stdmultimap)
- [Unordered Associative Containers](#unordered-associative-containers)
  - [std::unordered_set](#stdunordered_set)
  - [std::unordered_map](#stdunordered_map)

---

## Ordered Associative Containers

**How Do They Work?**

Ordered containers use **red-black trees** - a type of self-balancing binary search tree. Here's the intuition:

```
Binary Search Tree Example (set with values {1, 3, 4, 5, 7}):
       4
      / \
     3   5
    /     \
   1       7

To find 7:
1. Start at 4: 7 > 4, go right
2. At 5: 7 > 5, go right  
3. At 7: Found! (Only 3 comparisons instead of 5)
```

The tree stays balanced, ensuring height is always O(log n), which guarantees efficient operations.

### std::set

**Unique sorted elements - your go-to for "is this element in my collection?"**

- 📖 [cppreference: std::set](https://en.cppreference.com/w/cpp/container/set)

#### What is std::set?

`std::set` maintains a sorted collection of **unique** elements. Think of it as a mathematical set - no duplicates, automatic sorting, and fast membership testing.

**Internal Structure:**

Each element in the tree contains:
- The value itself
- Pointers to left child, right child, and parent
- A color (red or black for balancing)

**Key Insight:** When you insert into a set, it doesn't go at the "end" like a vector. Instead, it finds its sorted position in the tree. This is why iteration always gives you elements in order!

#### Characteristics
- **Lookup**: O(log n) - Binary search in tree
- **Insert/Delete**: O(log n) - Find position + rebalance tree
- **Sorted**: Yes - always in order (using `operator<` or custom comparator)
- **Duplicates**: No - attempting to insert duplicate fails
- **Memory**: Higher overhead than vector (tree pointers per element)

#### When to Use
✅ Need **sorted unique elements** automatically  
✅ Frequent **"does this exist?"** queries  
✅ Need to maintain **sorted order** while inserting/removing  
✅ Want **no duplicates** enforced automatically

#### When NOT to Use
❌ Need duplicates (use `multiset` instead)  
❌ Don't need sorting (use `unordered_set` for faster operations)  
❌ Need index-based access (use `vector` instead)  
❌ Memory overhead matters (tree pointers add ~24 bytes per element)

#### Example
```cpp
#include <set>
#include <iostream>

int main() {
    std::set<int> s = {3, 1, 4, 1, 5};
    
    // Duplicates automatically removed
    // Elements sorted: {1, 3, 4, 5}
    
    // Insert - O(log n)
    auto [it, inserted] = s.insert(2);
    std::cout << "Inserted: " << std::boolalpha << inserted << '\n';  // true
    
    // Try to insert duplicate
    auto [it2, inserted2] = s.insert(3);
    std::cout << "Inserted: " << inserted2 << '\n';  // false
    std::cout << "Iterator points to: " << *it2 << '\n';  // 3
    
    // Find - O(log n)
    if (s.find(4) != s.end()) {
        std::cout << "Found 4\n";
    }
    
    // Count - O(log n), returns 0 or 1 for set
    std::cout << "Count of 3: " << s.count(3) << '\n';  // 1
    std::cout << "Count of 10: " << s.count(10) << '\n';  // 0
    
    // Iteration is in sorted order
    for (const auto& val : s) {
        std::cout << val << ' ';  // 1 2 3 4 5
    }
    std::cout << '\n';
    
    // Erase - O(log n)
    s.erase(3);
    
    return 0;
}
```

#### Custom Comparator
```cpp
#include <set>
#include <string>
#include <iostream>

// Custom comparator for case-insensitive strings
struct CaseInsensitive {
    bool operator()(const std::string& a, const std::string& b) const {
        return std::lexicographical_compare(
            a.begin(), a.end(),
            b.begin(), b.end(),
            [](char c1, char c2) { return std::tolower(c1) < std::tolower(c2); }
        );
    }
};

int main() {
    std::set<std::string, CaseInsensitive> s = {"Apple", "banana", "CHERRY"};
    
    for (const auto& fruit : s) {
        std::cout << fruit << ' ';  // Apple banana CHERRY (sorted case-insensitively)
    }
    std::cout << '\n';
    
    return 0;
}
```

---

### std::multiset

**Sorted elements with duplicates allowed**

- 📖 [cppreference: std::multiset](https://en.cppreference.com/w/cpp/container/multiset)

#### Characteristics
- Same as `set` but **allows duplicates**
- **count()** can return > 1

#### Example
```cpp
#include <set>
#include <iostream>

int main() {
    std::multiset<int> ms = {1, 2, 2, 3, 3, 3};
    
    // Duplicates are kept
    ms.insert(2);  // {1, 2, 2, 2, 3, 3, 3}
    
    // Count returns number of occurrences
    std::cout << "Count of 3: " << ms.count(3) << '\n';  // 3
    
    // equal_range to find all occurrences
    auto range = ms.equal_range(2);
    std::cout << "Elements with value 2: ";
    for (auto it = range.first; it != range.second; ++it) {
        std::cout << *it << ' ';  // 2 2 2
    }
    std::cout << '\n';
    
    // Erase all occurrences of a value
    ms.erase(2);  // Removes all 2's
    
    return 0;
}
```

---

### std::map

**Key-value pairs, sorted by key**

- 📖 [cppreference: std::map](https://en.cppreference.com/w/cpp/container/map)

#### Characteristics
- **Lookup by key**: O(log n)
- **Insert/Delete**: O(log n)
- **Sorted by key**: Yes
- **Unique keys**: Yes

#### When to Use
✅ Need key-value associations  
✅ Keys must be unique  
✅ Need sorted order  
✅ Frequent lookups by key

#### Example
```cpp
#include <map>
#include <string>
#include <iostream>

int main() {
    std::map<std::string, int> ages;
    
    // Insert using operator[]
    ages["Alice"] = 30;
    ages["Bob"] = 25;
    ages["Charlie"] = 35;
    
    // operator[] creates entry if it doesn't exist
    std::cout << ages["David"] << '\n';  // 0 (default-constructed int)
    
    // Insert using insert (doesn't overwrite)
    auto [it, inserted] = ages.insert({"Alice", 31});
    std::cout << "Inserted: " << inserted << '\n';  // false
    std::cout << "Alice's age: " << it->second << '\n';  // 30 (unchanged)
    
    // Insert or assign (C++17)
    ages.insert_or_assign("Alice", 31);
    std::cout << "Alice's age: " << ages["Alice"] << '\n';  // 31
    
    // Find - returns iterator
    auto found = ages.find("Bob");
    if (found != ages.end()) {
        std::cout << found->first << " is " << found->second << '\n';
    }
    
    // Iteration (sorted by key)
    for (const auto& [name, age] : ages) {  // Structured binding (C++17)
        std::cout << name << ": " << age << '\n';
    }
    
    // Erase
    ages.erase("David");
    
    return 0;
}
```

#### Map Operations
```cpp
// Element access
map[key];              // Creates if doesn't exist!
map.at(key);           // Throws if doesn't exist

// Lookup
map.find(key);         // Returns iterator
map.count(key);        // 0 or 1 for map
map.contains(key);     // C++20, returns bool

// Insert
map[key] = value;
map.insert({key, value});
map.emplace(key, value);
map.insert_or_assign(key, value);  // C++17

// Extract node (C++17) - move without copy
auto node = map.extract(key);
other_map.insert(std::move(node));
```

---

### std::multimap

**Key-value pairs with duplicate keys allowed**

- 📖 [cppreference: std::multimap](https://en.cppreference.com/w/cpp/container/multimap)

#### Characteristics
- Same as `map` but **allows duplicate keys**
- **No operator[]** (ambiguous which value to return)

#### When to Use
✅ One key maps to multiple values  
✅ Need sorted order

#### Example
```cpp
#include <map>
#include <string>
#include <iostream>

int main() {
    std::multimap<std::string, int> scores;
    
    // Multiple values per key
    scores.insert({"Alice", 90});
    scores.insert({"Alice", 85});
    scores.insert({"Bob", 95});
    scores.insert({"Alice", 92});
    
    // Count occurrences of a key
    std::cout << "Alice has " << scores.count("Alice") << " scores\n";  // 3
    
    // Find all values for a key using equal_range
    auto range = scores.equal_range("Alice");
    std::cout << "Alice's scores: ";
    for (auto it = range.first; it != range.second; ++it) {
        std::cout << it->second << ' ';  // 85 90 92 (sorted)
    }
    std::cout << '\n';
    
    // No operator[]!
    // scores["Alice"];  // ERROR: doesn't compile
    
    return 0;
}
```

---

## Unordered Associative Containers

Implemented using **hash tables**. Elements are **not sorted**.

### std::unordered_set

**Unique elements using hash table**

- 📖 [cppreference: std::unordered_set](https://en.cppreference.com/w/cpp/container/unordered_set)

#### Characteristics
- **Lookup**: O(1) average, O(n) worst
- **Insert/Delete**: O(1) average
- **Sorted**: No
- **Requires**: Hash function and `operator==`

#### When to Use
✅ Don't need sorted order  
✅ Faster lookups than `set`  
✅ Type is hashable

#### Example
```cpp
#include <unordered_set>
#include <string>
#include <iostream>

int main() {
    std::unordered_set<std::string> words = {"apple", "banana", "cherry"};
    
    // Insert - O(1) average
    words.insert("date");
    
    // Find - O(1) average
    if (words.find("banana") != words.end()) {
        std::cout << "Found banana\n";
    }
    
    // Iteration order is NOT sorted!
    for (const auto& word : words) {
        std::cout << word << ' ';  // Unpredictable order
    }
    std::cout << '\n';
    
    // Hash statistics
    std::cout << "Bucket count: " << words.bucket_count() << '\n';
    std::cout << "Load factor: " << words.load_factor() << '\n';
    
    return 0;
}
```

#### Custom Hash for User-Defined Types
```cpp
#include <unordered_set>
#include <iostream>

struct Point {
    int x, y;
    
    bool operator==(const Point& other) const {
        return x == other.x && y == other.y;
    }
};

// Hash function
struct PointHash {
    std::size_t operator()(const Point& p) const {
        return std::hash<int>()(p.x) ^ (std::hash<int>()(p.y) << 1);
    }
};

int main() {
    std::unordered_set<Point, PointHash> points;
    
    points.insert({1, 2});
    points.insert({3, 4});
    
    Point search{1, 2};
    if (points.find(search) != points.end()) {
        std::cout << "Found point (1, 2)\n";
    }
    
    return 0;
}
```

---

### std::unordered_map

**Key-value pairs using hash table**

- 📖 [cppreference: std::unordered_map](https://en.cppreference.com/w/cpp/container/unordered_map)

#### Characteristics
- **Lookup by key**: O(1) average, O(n) worst
- **Insert/Delete**: O(1) average
- **Sorted**: No

#### When to Use
✅ Don't need sorted order  
✅ Fastest possible lookups  
✅ Key type is hashable

#### Example
```cpp
#include <unordered_map>
#include <string>
#include <iostream>

int main() {
    std::unordered_map<std::string, int> wordCount;
    
    // Count word occurrences
    std::string text[] = {"the", "quick", "brown", "fox", "the", "quick"};
    for (const auto& word : text) {
        wordCount[word]++;  // Creates with 0 if doesn't exist
    }
    
    // Display counts
    for (const auto& [word, count] : wordCount) {
        std::cout << word << ": " << count << '\n';
    }
    
    // Rehash for better performance
    wordCount.reserve(100);  // Reserve space
    
    return 0;
}
```

---

## Comparison: Ordered vs Unordered

| Feature | Ordered (set/map) | Unordered (unordered_set/map) |
|---------|-------------------|-------------------------------|
| **Implementation** | Red-black tree | Hash table |
| **Lookup** | O(log n) | O(1) average |
| **Insert** | O(log n) | O(1) average |
| **Iteration Order** | Sorted ✓ | Unpredictable |
| **Requirements** | `operator<` | Hash + `operator==` |
| **Memory** | Lower | Higher (buckets) |
| **Worst Case** | O(log n) ✓ | O(n) |

**When to choose ordered:**
- Need sorted iteration
- Predictable performance
- Range queries (lower_bound, upper_bound)

**When to choose unordered:**
- Don't care about order
- Need fastest average lookups
- Have good hash function

---

## Key Concepts

### Iterator Invalidation in Associative Containers

```cpp
std::map<int, std::string> m = {{1, "one"}, {2, "two"}, {3, "three"}};

auto it1 = m.find(1);
auto it2 = m.find(2);

// Insert doesn't invalidate existing iterators
m.insert({4, "four"});
std::cout << it1->second << '\n';  // Still valid: "one"

// Erase only invalidates iterator to erased element
m.erase(2);
// it2 is now invalid!
std::cout << it1->second << '\n';  // Still valid: "one"
```

### emplace vs insert

```cpp
std::map<std::string, ComplexObject> m;

// insert: constructs temporary, then moves
m.insert({"key", ComplexObject(args)});

// emplace: constructs in-place (more efficient)
m.emplace("key", args);  // Constructs ComplexObject directly in map
```

### Extract and Merge (C++17)

```cpp
std::map<int, std::string> m1 = {{1, "one"}, {2, "two"}};
std::map<int, std::string> m2;

// Extract node without copying
auto node = m1.extract(1);
node.key() = 10;  // Can modify key!

// Insert into another map
m2.insert(std::move(node));

// Merge entire maps
m2.merge(m1);  // m1's elements moved to m2 (if keys don't conflict)
```

---

## Making the Right Choice: Associative Container Decision Guide

### The Master Decision Tree

```
Do you need key-value pairs or just keys?
├─ KEY-VALUE PAIRS (dictionary/lookup table)
│  ├─ Need sorted order? → std::map
│  ├─ Need fastest lookup? → std::unordered_map  
│  └─ Need duplicate keys? → std::multimap (ordered) or std::unordered_multimap
│
└─ JUST KEYS (set membership)
   ├─ Need sorted order? → std::set
   ├─ Need fastest lookup? → std::unordered_set
   └─ Need duplicate keys? → std::multiset (ordered) or std::unordered_multiset
```

### Ordered vs Unordered: The Critical Decision

**Use Ordered (set/map) When:**
- ✅ Need elements in sorted order
- ✅ Need range queries (all elements between A and B)
- ✅ Performance must be **predictable** (guaranteed O(log n))
- ✅ Want to iterate in sorted order
- ✅ Keys don't have a good hash function

**Use Unordered (unordered_set/unordered_map) When:**
- ✅ Need **fastest possible** average lookup (O(1))
- ✅ Don't care about order
- ✅ Have a good hash function available
- ✅ Want to minimize operation count (not concerned about worst case)

**Performance Comparison:**
```cpp
// Ordered: O(log n) - 1,000,000 elements ≈ 20 operations
std::set<int> ordered;
// 1,000,000 lookups ≈ 20,000,000 tree traversals

// Unordered: O(1) average - 1,000,000 elements ≈ 1 operation  
std::unordered_set<int> unordered;
// 1,000,000 lookups ≈ 1,000,000 hash computations + array accesses
```

### Real-World Scenarios

#### Scenario 1: Word Frequency Counter
**Problem:** Count how many times each word appears in a document

```cpp
// ✅ Perfect: unordered_map for fast lookups
std::unordered_map<std::string, int> wordCount;

for (const auto& word : document) {
    wordCount[word]++;  // O(1) average
}

// If you need sorted output later:
std::map<std::string, int> sorted(wordCount.begin(), wordCount.end());
```

#### Scenario 2: Leaderboard (Top Scores)
**Problem:** Maintain game scores in sorted order

```cpp
// ✅ Perfect: map keeps scores sorted
std::map<int, std::string, std::greater<int>> leaderboard;
// greater<int> makes it descending order

leaderboard[9500] = "Alice";
leaderboard[9200] = "Bob";
leaderboard[9800] = "Charlie";

// Iterate to get top scores in order
for (const auto& [score, name] : leaderboard) {
    std::cout << name << ": " << score << '\n';
}
// Output: Charlie: 9800, Alice: 9500, Bob: 9200
```

#### Scenario 3: Unique Visitor Tracking
**Problem:** Track unique IP addresses visiting your website

```cpp
// ❌ Bad: set when order doesn't matter
std::set<std::string> visitors;
// O(log n) insert - unnecessary overhead

// ✅ Better: unordered_set for fast membership test
std::unordered_set<std::string> visitors;
// O(1) average insert - much faster

void recordVisit(const std::string& ip) {
    if (visitors.insert(ip).second) {
        std::cout << "New visitor!\n";
    }
}
```

#### Scenario 4: Range Queries
**Problem:** Find all events between two timestamps

```cpp
// ✅ Only ordered containers support this!
std::map<Timestamp, Event> events;

// Find all events between start and end
auto lower = events.lower_bound(start_time);
auto upper = events.upper_bound(end_time);

for (auto it = lower; it != upper; ++it) {
    processEvent(it->second);
}

// ❌ Impossible with unordered_map!
// Would have to iterate through ALL elements
```

### Understanding Hash Tables vs Trees

**Hash Table (Unordered) Mental Model:**

Think of a hash table like a library with numbered shelves:

```
Hash function: "apple" → 42
Hash function: "banana" → 17

Buckets (array):
[0] → empty
[1] → empty
...
[17] → ["banana", value] → ["berry", value]  // collision: both hash to 17
...
[42] → ["apple", value]
...
[99] → empty

Lookup "apple":
1. Hash "apple" → 42
2. Go to bucket 42
3. Found! (1 operation if no collisions)
```

**Binary Search Tree (Ordered) Mental Model:**

Think of a tree like a "guess the number" game:

```
Tree for {1, 3, 5, 7, 9, 11, 13}:
         7
        / \
       3   11
      / \  / \
     1  5 9  13

Find 9:
"Is it 7?" No, bigger → go right
"Is it 11?" No, smaller → go left  
"Is it 9?" Yes! (3 comparisons)
```

### Common Mistakes and How to Avoid Them

#### Mistake 1: Using map When You Just Need Existence

```cpp
// ❌ Wasteful: map stores unnecessary values
std::map<std::string, bool> seen;
seen["item1"] = true;
seen["item2"] = true;

// ✅ Better: set is sufficient
std::unordered_set<std::string> seen;
seen.insert("item1");
seen.insert("item2");
```

#### Mistake 2: Not Checking operator[] Side Effects

```cpp
std::map<int, int> m;

// ❌ Creates entry if not found!
std::cout << m[5];  // m now contains {5: 0}!

// ✅ Use find to check existence
auto it = m.find(5);
if (it != m.end()) {
    std::cout << it->second;
} else {
    std::cout << "Not found\n";
}
```

#### Mistake 3: Expecting Ordered Iteration from Unordered Containers

```cpp
std::unordered_set<int> s = {5, 1, 3, 2, 4};

// ❌ Don't expect any particular order!
for (int x : s) {
    std::cout << x << ' ';  // Might print: 2 5 1 4 3 (random)
}

// ✅ If you need order, use ordered container
std::set<int> s = {5, 1, 3, 2, 4};
for (int x : s) {
    std::cout << x << ' ';  // Always: 1 2 3 4 5
}
```

#### Mistake 4: Using Custom Types Without Proper Setup

```cpp
struct Point {
    int x, y;
};

// ❌ Won't compile - no operator< defined!
// std::set<Point> points;

// ✅ Option 1: Define operator<
struct Point {
    int x, y;
    bool operator<(const Point& other) const {
        return x < other.x || (x == other.x && y < other.y);
    }
};
std::set<Point> points;  // Now works!

// ✅ Option 2: Provide custom comparator
struct PointCompare {
    bool operator()(const Point& a, const Point& b) const {
        return a.x < b.x || (a.x == b.x && a.y < b.y);
    }
};
std::set<Point, PointCompare> points;

// For unordered_set, need hash function + equality
struct PointHash {
    size_t operator()(const Point& p) const {
        return std::hash<int>()(p.x) ^ (std::hash<int>()(p.y) << 1);
    }
};
struct PointEqual {
    bool operator()(const Point& a, const Point& b) const {
        return a.x == b.x && a.y == b.y;
    }
};
std::unordered_set<Point, PointHash, PointEqual> points;
```

### Performance Characteristics Summary

| Operation | set/map | unordered_set/map | multiset/map |
|-----------|---------|-------------------|--------------|
| Insert | O(log n) | O(1) avg, O(n) worst | O(log n) |
| Find | O(log n) | O(1) avg, O(n) worst | O(log n) |
| Erase | O(log n) | O(1) avg, O(n) worst | O(log n) |
| Iteration | Sorted order | No order | Sorted (within duplicates) |
| Memory | Higher (tree nodes) | Higher (hash buckets) | Highest (tree + duplicates) |
| Predictability | Guaranteed | Average case | Guaranteed |

### Iterator Invalidation Rules

**Ordered Containers (set/map):**
- ✅ Insert never invalidates iterators
- ⚠️ Erase only invalidates iterators to erased elements
- ✅ All other iterators remain valid

**Unordered Containers:**
- ⚠️ Insert may invalidate if rehashing occurs
- ⚠️ Erase only invalidates iterators to erased elements  
- ✅ Can prevent rehashing with `reserve()`

```cpp
std::set<int> s = {1, 2, 3, 4, 5};
auto it = s.find(3);

s.insert(10);  // ✅ 'it' still valid
s.erase(4);    // ✅ 'it' still valid (points to 3)
s.erase(3);    // ⚠️ 'it' now invalid!
```

---

## Practice Questions

1. What's the difference between `std::set` and `std::unordered_set`?
2. Why doesn't `std::multimap` provide `operator[]`?
3. When should you use `std::map` over `std::unordered_map`?
4. What happens when you insert a duplicate key into `std::set`?
5. What requirements must a custom type meet to be used in `std::unordered_set`?

## Key Takeaways

✅ **Ordered containers** use trees, provide sorted iteration, O(log n) operations  
✅ **Unordered containers** use hash tables, faster O(1) average lookups, no order  
✅ **multiset/multimap** allow duplicate keys  
✅ **map::operator[]** creates entries if they don't exist  
✅ **Iterator invalidation** is minimal - only erased elements  
✅ **Custom types** need `operator<` for ordered, hash function + `operator==` for unordered

---

[← Previous: Module 1](./module-1-sequence-containers.md) | [Back to Index](./README.md) | [Next: Module 3 →](./module-3-non-modifying-operations.md)

