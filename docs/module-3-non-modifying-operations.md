# Module 3: Non-Modifying Sequence Operations

## Overview

**What are Non-Modifying Algorithms?**

Non-modifying algorithms are your "read-only" toolkit - they examine, search, count, and compare elements without changing the container's contents. Think of them as scouts that gather information but never alter what they find.

**Why Separate "Non-Modifying" Algorithms?**

Understanding that an algorithm won't modify your data is crucial for:
1. **Const-correctness**: Can be used on const containers
2. **Thread safety**: Safe to use concurrently (reading doesn't cause data races)
3. **Reasoning about code**: Know your data won't change unexpectedly

**The Four Categories:**

1. **Search Algorithms** (`find`, `search`, `find_first_of`)
   - "Where is this element?"
   - Return iterators to found elements

2. **Counting Algorithms** (`count`, `count_if`)
   - "How many elements match?"
   - Return numeric counts

3. **Comparison Algorithms** (`equal`, `mismatch`, `lexicographical_compare`)
   - "Are these ranges the same?"
   - Compare two sequences

4. **Examination Algorithms** (`all_of`, `any_of`, `none_of`)
   - "Do elements satisfy a condition?"
   - Return boolean results

**Key Insight: Predicates**

Many algorithms accept a **predicate** - a function that returns true/false:

```cpp
// Simple function
bool isEven(int x) { return x % 2 == 0; }

// Lambda (C++11) - most common and flexible
[](int x) { return x % 2 == 0; }

// Function object (functor)
struct IsEven {
    bool operator()(int x) const { return x % 2 == 0; }
};

// All three can be used with algorithms!
std::find_if(vec.begin(), vec.end(), isEven);
std::find_if(vec.begin(), vec.end(), [](int x) { return x % 2 == 0; });
std::find_if(vec.begin(), vec.end(), IsEven{});
```

📖 [cppreference: Algorithm library](https://en.cppreference.com/w/cpp/algorithm)

---

## Key Algorithms

### Searching Algorithms

**The Big Picture:** These algorithms answer "Where is it?" by returning an iterator.

**Critical Pattern:** Always check if the element was found!

```cpp
auto it = std::find(vec.begin(), vec.end(), value);
if (it != vec.end()) {  // ⚠️ Essential check!
    // Found - safe to use *it
} else {
    // Not found - don't dereference!
}
```

#### std::find
**Find first occurrence of a value - your basic linear search**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5, 3};
    
    // Find first 3
    auto it = std::find(vec.begin(), vec.end(), 3);
    if (it != vec.end()) {
        std::cout << "Found at index: " << (it - vec.begin()) << '\n';  // 2
        std::cout << "Value: " << *it << '\n';  // 3
    }
    
    // Find non-existent element
    auto it2 = std::find(vec.begin(), vec.end(), 10);
    if (it2 == vec.end()) {
        std::cout << "10 not found\n";
    }
    
    return 0;
}
```

**How it Works:** Walks through each element comparing with `operator==` until found or end reached.

**Complexity:** O(n) - worst case checks every element

**When to Use:**
- ✅ Simple value search in unsorted container
- ✅ Need to find position, not just existence
- ❌ Don't use on sorted containers - use `binary_search` or `lower_bound` instead!

- 📖 [cppreference: std::find](https://en.cppreference.com/w/cpp/algorithm/find)

#### std::find_if / std::find_if_not
**Find element matching predicate - the flexible searcher**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 3, 5, 6, 7};
    
    // Find first even number
    auto it = std::find_if(vec.begin(), vec.end(), 
                           [](int x) { return x % 2 == 0; });
    if (it != vec.end()) {
        std::cout << "First even: " << *it << '\n';  // 6
    }
    
    // Find first number > 5
    auto it2 = std::find_if(vec.begin(), vec.end(),
                            [](int x) { return x > 5; });
    // Found: 6
    
    // find_if_not: Find first ODD number
    std::vector<int> vec2 = {2, 4, 5, 6};
    auto it3 = std::find_if_not(vec2.begin(), vec2.end(),
                                [](int x) { return x % 2 == 0; });
    // Found: 5 (first non-even)
    
    return 0;
}
```

**Real-World Example:**
```cpp
struct Person {
    std::string name;
    int age;
};

std::vector<Person> people = {
    {"Alice", 25},
    {"Bob", 30},
    {"Charlie", 35}
};

// Find first person over 30
auto it = std::find_if(people.begin(), people.end(),
                      [](const Person& p) { return p.age > 30; });
if (it != people.end()) {
    std::cout << it->name << " is over 30\n";  // Charlie
}
```

**When to Use:**
- ✅ Search based on complex conditions
- ✅ Find elements with specific properties
- ✅ When `find` isn't flexible enough
    if (it != vec.end()) {
        std::cout << "First even: " << *it << '\n';  // 6
    }
    
    // Find first odd number (using find_if_not)
    auto it2 = std::find_if_not(vec.begin(), vec.end(),
                                [](int x) { return x % 2 == 0; });
    std::cout << "First odd: " << *it2 << '\n';  // 1
    
    return 0;
}
```

- 📖 [cppreference: std::find_if](https://en.cppreference.com/w/cpp/algorithm/find)

#### std::find_first_of
**Find any element from a set**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> haystack = {1, 2, 3, 4, 5};
    std::vector<int> needles = {3, 7, 9};
    
    auto it = std::find_first_of(haystack.begin(), haystack.end(),
                                  needles.begin(), needles.end());
    
    if (it != haystack.end()) {
        std::cout << "Found: " << *it << '\n';  // 3
    }
    
    return 0;
}
```

- 📖 [cppreference: std::find_first_of](https://en.cppreference.com/w/cpp/algorithm/find_first_of)

#### std::adjacent_find
**Find consecutive equal elements**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 3, 4, 5};
    
    auto it = std::adjacent_find(vec.begin(), vec.end());
    if (it != vec.end()) {
        std::cout << "First duplicate: " << *it << '\n';  // 3
    }
    
    // With custom predicate: find consecutive elements that differ by 1
    auto it2 = std::adjacent_find(vec.begin(), vec.end(),
                                   [](int a, int b) { return b - a == 1; });
    std::cout << "Found consecutive: " << *it2 << '\n';  // 1
    
    return 0;
}
```

- 📖 [cppreference: std::adjacent_find](https://en.cppreference.com/w/cpp/algorithm/adjacent_find)

#### std::search
**Find subsequence in sequence**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> text = {1, 2, 3, 4, 5, 6};
    std::vector<int> pattern = {3, 4, 5};
    
    auto it = std::search(text.begin(), text.end(),
                          pattern.begin(), pattern.end());
    
    if (it != text.end()) {
        std::cout << "Pattern found at index: " << (it - text.begin()) << '\n';  // 2
    }
    
    return 0;
}
```

- 📖 [cppreference: std::search](https://en.cppreference.com/w/cpp/algorithm/search)

#### std::search_n
**Find n consecutive occurrences**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 3, 3, 4};
    
    // Find 3 consecutive 3's
    auto it = std::search_n(vec.begin(), vec.end(), 3, 3);
    
    if (it != vec.end()) {
        std::cout << "Found at index: " << (it - vec.begin()) << '\n';  // 2
    }
    
    return 0;
}
```

- 📖 [cppreference: std::search_n](https://en.cppreference.com/w/cpp/algorithm/search_n)

---

### Counting Algorithms

#### std::count / std::count_if

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 2, 4, 2, 5};
    
    // Count occurrences of value
    int count = std::count(vec.begin(), vec.end(), 2);
    std::cout << "Count of 2: " << count << '\n';  // 3
    
    // Count elements matching predicate
    int even_count = std::count_if(vec.begin(), vec.end(),
                                   [](int x) { return x % 2 == 0; });
    std::cout << "Even count: " << even_count << '\n';  // 4
    
    return 0;
}
```

- 📖 [cppreference: std::count](https://en.cppreference.com/w/cpp/algorithm/count)

---

### Comparison Algorithms

#### std::equal
**Compare two ranges**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec1 = {1, 2, 3, 4};
    std::vector<int> vec2 = {1, 2, 3, 4};
    std::vector<int> vec3 = {1, 2, 3, 5};
    
    bool eq1 = std::equal(vec1.begin(), vec1.end(), vec2.begin());
    std::cout << std::boolalpha << eq1 << '\n';  // true
    
    bool eq2 = std::equal(vec1.begin(), vec1.end(), vec3.begin());
    std::cout << eq2 << '\n';  // false
    
    // With custom comparator
    bool eq3 = std::equal(vec1.begin(), vec1.end(), vec2.begin(),
                          [](int a, int b) { return std::abs(a) == std::abs(b); });
    
    return 0;
}
```

- 📖 [cppreference: std::equal](https://en.cppreference.com/w/cpp/algorithm/equal)

#### std::mismatch
**Find first difference**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec1 = {1, 2, 3, 4, 5};
    std::vector<int> vec2 = {1, 2, 9, 4, 5};
    
    auto [it1, it2] = std::mismatch(vec1.begin(), vec1.end(),
                                     vec2.begin());
    
    std::cout << "First mismatch at: " << *it1 << " vs " << *it2 << '\n';  // 3 vs 9
    
    return 0;
}
```

- 📖 [cppreference: std::mismatch](https://en.cppreference.com/w/cpp/algorithm/mismatch)

#### std::lexicographical_compare
**Dictionary-style comparison**

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec1 = {1, 2, 3};
    std::vector<int> vec2 = {1, 2, 4};
    std::vector<int> vec3 = {1, 2};
    
    bool less1 = std::lexicographical_compare(vec1.begin(), vec1.end(),
                                               vec2.begin(), vec2.end());
    std::cout << std::boolalpha << less1 << '\n';  // true (3 < 4)
    
    bool less2 = std::lexicographical_compare(vec3.begin(), vec3.end(),
                                               vec1.begin(), vec1.end());
    std::cout << less2 << '\n';  // true (shorter is less)
    
    return 0;
}
```

- 📖 [cppreference: std::lexicographical_compare](https://en.cppreference.com/w/cpp/algorithm/lexicographical_compare)

---

### Predicate Checking

#### std::all_of / std::any_of / std::none_of

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {2, 4, 6, 8};
    
    // Check if all elements are even
    bool all_even = std::all_of(vec.begin(), vec.end(),
                                [](int x) { return x % 2 == 0; });
    std::cout << std::boolalpha << "All even: " << all_even << '\n';  // true
    
    // Check if any element is > 5
    bool any_large = std::any_of(vec.begin(), vec.end(),
                                 [](int x) { return x > 5; });
    std::cout << "Any > 5: " << any_large << '\n';  // true
    
    // Check if no element is odd
    bool none_odd = std::none_of(vec.begin(), vec.end(),
                                 [](int x) { return x % 2 == 1; });
    std::cout << "None odd: " << none_odd << '\n';  // true
    
    return 0;
}
```

- 📖 [cppreference: std::all_of](https://en.cppreference.com/w/cpp/algorithm/all_any_none_of)

---

### Iteration Algorithm

#### std::for_each

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};
    
    // Apply function to each element
    std::for_each(vec.begin(), vec.end(),
                  [](int x) { std::cout << x * 2 << ' '; });
    std::cout << '\n';  // 2 4 6 8 10
    
    // for_each returns the function object
    struct Counter {
        int count = 0;
        void operator()(int) { ++count; }
    };
    
    Counter c = std::for_each(vec.begin(), vec.end(), Counter{});
    std::cout << "Count: " << c.count << '\n';  // 5
    
    return 0;
}
```

- 📖 [cppreference: std::for_each](https://en.cppreference.com/w/cpp/algorithm/for_each)

---

## Algorithm Complexity Summary

| Algorithm | Time Complexity |
|-----------|----------------|
| `find`, `find_if` | O(n) |
| `count`, `count_if` | O(n) |
| `search` | O(n×m) |
| `equal` | O(n) |
| `mismatch` | O(n) |
| `all_of`, `any_of`, `none_of` | O(n) |
| `for_each` | O(n) |

---

---

## Algorithm Selection Guide: Which Non-Modifying Algorithm to Use?

### The Decision Tree

```
What do you want to do?

FIND something
├─ Find exact value? → std::find
├─ Find matching condition? → std::find_if / std::find_if_not
├─ Find subsequence? → std::search
├─ Find any of multiple values? → std::find_first_of
└─ Find adjacent duplicates? → std::adjacent_find

COUNT things
├─ Count exact value? → std::count
└─ Count matching condition? → std::count_if

CHECK conditions
├─ Check all elements? → std::all_of
├─ Check any element? → std::any_of
├─ Check no elements? → std::none_of

COMPARE sequences
├─ Are they equal? → std::equal
├─ Where do they differ? → std::mismatch
└─ Which is lexicographically less? → std::lexicographical_compare

EXAMINE each element
└─ Apply function to each? → std::for_each
```

### Real-World Scenarios

#### Scenario 1: Validating User Input
**Problem:** Check if all characters in a string are digits

```cpp
#include <algorithm>
#include <string>
#include <cctype>

bool isValidNumber(const std::string& str) {
    // ❌ Manual loop - error-prone
    for (size_t i = 0; i < str.size(); ++i) {
        if (!std::isdigit(str[i])) {
            return false;
        }
    }
    return true;
    
    // ✅ Better - expressive and correct
    return std::all_of(str.begin(), str.end(),
                      [](char c) { return std::isdigit(c); });
}
```

**Why it's better:**
- More readable - intent is clear
- Less error-prone - no index math
- Composable - easy to combine conditions

#### Scenario 2: Finding Configuration Errors
**Problem:** Find first invalid configuration entry

```cpp
struct Config {
    std::string key;
    int value;
    bool isValid() const { return value >= 0 && value <= 100; }
};

std::vector<Config> configs = {
    {"timeout", 30},
    {"retries", 3},
    {"max_size", 150},  // Invalid!
    {"buffer", 50}
};

// Find first invalid entry
auto it = std::find_if(configs.begin(), configs.end(),
                      [](const Config& c) { return !c.isValid(); });

if (it != configs.end()) {
    std::cout << "Invalid config: " << it->key 
              << " = " << it->value << '\n';
}
```

#### Scenario 3: Data Validation
**Problem:** Ensure two datasets match

```cpp
std::vector<int> expected = {1, 2, 3, 4, 5};
std::vector<int> actual = {1, 2, 3, 4, 5};

// Quick equality check
if (std::equal(expected.begin(), expected.end(), actual.begin())) {
    std::cout << "Data matches!\n";
} else {
    // Find where they differ
    auto [exp_it, act_it] = std::mismatch(
        expected.begin(), expected.end(),
        actual.begin()
    );
    
    if (exp_it != expected.end()) {
        std::cout << "Mismatch: expected " << *exp_it 
                  << ", got " << *act_it << '\n';
    }
}
```

#### Scenario 4: Log File Analysis
**Problem:** Count error messages in log

```cpp
struct LogEntry {
    std::string level;
    std::string message;
};

std::vector<LogEntry> logs = {
    {"INFO", "Started"},
    {"ERROR", "Connection failed"},
    {"WARN", "Retry"},
    {"ERROR", "Timeout"},
    {"INFO", "Completed"}
};

// Count errors
int errorCount = std::count_if(logs.begin(), logs.end(),
    [](const LogEntry& e) { return e.level == "ERROR"; });

std::cout << "Found " << errorCount << " errors\n";  // 2

// Check if any critical errors exist
bool hasCritical = std::any_of(logs.begin(), logs.end(),
    [](const LogEntry& e) { 
        return e.level == "ERROR" && e.message.find("critical") != std::string::npos;
    });
```

### Understanding Algorithm Complexity

**Why O(n) is Unavoidable:**

Non-modifying algorithms must examine elements to make decisions. There's no way around this - they're fundamentally linear operations.

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};

// O(n) - must check each element
auto it = std::find(vec.begin(), vec.end(), 5);

// Still O(n) - stops early if found, but worst case is n
auto it = std::find(vec.begin(), vec.end(), 5);  // Checks 5 elements

// O(n) - must check all to verify condition
bool all = std::all_of(vec.begin(), vec.end(), 
                      [](int x) { return x > 0; });  // Must check all 5
```

**When to Optimize:**
- If searching frequently in large datasets → use `std::set` or `std::unordered_set`
- If checking sorted data → use `binary_search`, `lower_bound`
- If checking all elements often → cache result or reorganize data

### Common Patterns and Best Practices

#### Pattern 1: Safe Iterator Usage

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};

// ❌ DANGEROUS - undefined behavior if not found!
auto it = std::find(vec.begin(), vec.end(), 10);
std::cout << *it;  // UB! it == vec.end()

// ✅ SAFE - always check first
auto it = std::find(vec.begin(), vec.end(), 10);
if (it != vec.end()) {
    std::cout << *it;
} else {
    std::cout << "Not found\n";
}

// ✅ Alternative - use count for existence check
if (std::count(vec.begin(), vec.end(), 10) > 0) {
    // Exists
}
```

#### Pattern 2: Combining Algorithms

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// Find first even number greater than 5
auto it = std::find_if(numbers.begin(), numbers.end(),
    [](int x) { return x > 5 && x % 2 == 0; });
// Found: 6

// Count how many numbers satisfy both conditions
int count = std::count_if(numbers.begin(), numbers.end(),
    [](int x) { return x > 5 && x % 2 == 0; });
// Count: 3 (6, 8, 10)
```

#### Pattern 3: Using for_each for Side Effects

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

// Accumulate sum using for_each
int sum = 0;
std::for_each(numbers.begin(), numbers.end(),
    [&sum](int x) { sum += x; });
std::cout << "Sum: " << sum << '\n';  // 15

// Better: use std::accumulate from <numeric> for this!
// But for_each is useful for multiple operations:
std::for_each(numbers.begin(), numbers.end(),
    [](int x) {
        std::cout << x << ' ';  // Print
        logValue(x);           // Log
        validate(x);           // Validate
    });
```

#### Pattern 4: Predicate Composition

```cpp
// Define reusable predicates
auto isEven = [](int x) { return x % 2 == 0; };
auto isPositive = [](int x) { return x > 0; };
auto isLarge = [](int x) { return x > 100; };

// Combine them
auto isEvenAndPositive = [&](int x) { 
    return isEven(x) && isPositive(x); 
};

std::vector<int> numbers = {-2, 4, 6, -8, 10};

// Use composed predicate
auto it = std::find_if(numbers.begin(), numbers.end(), 
                      isEvenAndPositive);
// Found: 4
```

### Performance Comparison

| Algorithm | Complexity | Early Exit? | Use Case |
|-----------|------------|-------------|----------|
| find | O(n) | Yes | Find specific value |
| find_if | O(n) | Yes | Find by condition |
| count | O(n) | No | Count occurrences |
| count_if | O(n) | No | Count by condition |
| all_of | O(n) | Yes (if false) | Verify all match |
| any_of | O(n) | Yes (if true) | Check if any matches |
| none_of | O(n) | Yes (if true) | Verify none match |
| equal | O(n) | Yes (on mismatch) | Compare sequences |
| search | O(nm) | Yes | Find subsequence |

**Early Exit Explained:**
```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};

// find exits as soon as found
auto it = std::find(vec.begin(), vec.end(), 2);  // Checks only 2 elements

// count must check all
int c = std::count(vec.begin(), vec.end(), 2);  // Checks all 5 elements

// any_of exits on first true
bool any = std::any_of(vec.begin(), vec.end(), 
                      [](int x) { return x == 2; });  // Checks 2 elements

// all_of exits on first false
bool all = std::all_of(vec.begin(), vec.end(),
                      [](int x) { return x > 0; });  // Checks all 5 (all true)
```

### Common Mistakes to Avoid

#### Mistake 1: Dereferencing end()

```cpp
auto it = std::find(vec.begin(), vec.end(), 999);
// ❌ Crash if not found!
std::cout << *it;

// ✅ Always check
if (it != vec.end()) {
    std::cout << *it;
}
```

#### Mistake 2: Wrong Predicate Logic

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};

// ❌ Looking for "not even" but predicate is backwards!
auto it = std::find_if_not(vec.begin(), vec.end(),
    [](int x) { return x % 2 != 0; });  // This finds even!

// ✅ Correct logic
auto it = std::find_if_not(vec.begin(), vec.end(),
    [](int x) { return x % 2 == 0; });  // Finds odd
```

#### Mistake 3: Confusing equal and operator==

```cpp
std::vector<int> v1 = {1, 2, 3};
std::vector<int> v2 = {1, 2, 3};

// ❌ Container comparison (exists for vector)
if (v1 == v2) { }  // Works for vectors

// ✅ Algorithm comparison (works for any iterators)
if (std::equal(v1.begin(), v1.end(), v2.begin())) { }

// Why use algorithm? Works with different container types:
std::list<int> list = {1, 2, 3};
std::vector<int> vec = {1, 2, 3};
// Can't use list == vec, but can use:
std::equal(list.begin(), list.end(), vec.begin());
```

#### Mistake 4: Forgetting C++14/17 Improvements

```cpp
std::vector<int> v1 = {1, 2, 3, 4, 5};
std::vector<int> v2 = {1, 2, 3};

// ❌ C++11 - Doesn't check size, undefined behavior!
bool eq = std::equal(v1.begin(), v1.end(), v2.begin());

// ✅ C++14 - Pass both end iterators
bool eq = std::equal(v1.begin(), v1.end(), 
                    v2.begin(), v2.end());  // Returns false safely
```

## Key Takeaways

✅ All algorithms return **iterators** or **boolean** values, never modify elements  
✅ Use `_if` variants for **predicate-based** operations  
✅ Always check if returned iterator `!= end()` before dereferencing  
✅ `for_each` returns the **function object** (can accumulate state)  
✅ Algorithms work on **iterator ranges**, not containers directly

---

[← Previous: Module 2](./module-2-associative-containers.md) | [Back to Index](./README.md) | [Next: Module 4 →](./module-4-modifying-operations.md)

