# Module 2: Associative Containers

## Overview

Associative containers store elements in a sorted order (ordered containers) or use hash tables (unordered containers) for fast lookup based on keys.

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

Typically implemented as **red-black trees**. Elements are kept sorted.

### std::set

**Unique sorted elements**

- 📖 [cppreference: std::set](https://en.cppreference.com/w/cpp/container/set)

#### Characteristics
- **Lookup**: O(log n)
- **Insert/Delete**: O(log n)
- **Sorted**: Yes (using `operator<` or custom comparator)
- **Duplicates**: No

#### When to Use
✅ Need sorted unique elements  
✅ Frequent lookups and insertions  
✅ Don't need indexed access

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

