# Module 4: Modifying Sequence Operations

- [Overview](#overview)
  - [What are Modifying Algorithms?](#what-are-modifying-algorithms)
  - [The Critical Distinction](#the-critical-distinction)
  - [The Five Categories](#the-five-categories)

## [Overview](#overview)

### [What are Modifying Algorithms?](#what-are-modifying-algorithms)

Modifying algorithms are your "edit toolkit" - they change elements, 
rearrange order, or restructure container contents. Unlike non-modifying 
algorithms that just look, these algorithms actually alter your data.

### [The Critical Distinction](#the-critical-distinction)

```cpp
// Non-modifying: Just looks
auto it = std::find(vec.begin(), vec.end(), 5);  // Doesn't change vec

// Modifying: Changes data
std::replace(vec.begin(), vec.end(), 5, 10);  // Changes all 5s to 10s
```

### [The Five Categories](#the-five-categories)

1. **Copy/Move Operations** (`copy`, `move`, `swap`)
   - "Duplicate or transfer data"
   - Source remains unchanged (copy) or empty (move)

2. **Transform Operations** (`transform`)
   - "Apply function to elements"
   - Like map() in functional programming

3. **Replace Operations** (`replace`, `replace_if`)
   - "Change specific values"
   - In-place modification

4. **Remove Operations** (`remove`, `unique`)
   - ⚠️ **Don't actually delete!** (The famous gotcha)
   - Move unwanted elements to end
   - Need `erase()` to actually remove

5. **Reorder Operations** (`reverse`, `rotate`, `shuffle`)
   - "Rearrange element positions"
   - Same elements, different order

#### [The Most Important Concept: The Remove-Erase Idiom](#the-most-important-concept-the-remove--erase-idiom)

This is crucial to understand:

```cpp
std::vector<int> vec = {1, 2, 3, 2, 4, 2, 5};

// ❌ WRONG - remove doesn't actually remove!
std::remove(vec.begin(), vec.end(), 2);
std::cout << vec.size();  // Still 7! Elements moved but size unchanged

// ✅ CORRECT - remove + erase idiom
auto new_end = std::remove(vec.begin(), vec.end(), 2);
vec.erase(new_end, vec.end());  // Actually delete elements
std::cout << vec.size();  // Now 4: {1, 3, 4, 5}

// ✅ One-liner (most common)
vec.erase(std::remove(vec.begin(), vec.end(), 2), vec.end());
```

#### Why This Design?

Algorithms work on iterator ranges, not containers. They can't change 
container size because:

1. They don't know what container type they're working with
2. Not all containers support `erase()` the same way
3. You might not want to erase (maybe just count removed items first)

Visual representation of remove():

```text
Before: [1][2][3][2][4][2][5]

After remove(2):
        [1][3][4][5][?][?][?]  ← "removed" elements moved to end
                     ↑
                  new_end
Size is still 7! Need erase() to actually shrink.
```

Deep dive can be found below: [The Remove-Erase Idiom: Deep Dive](#the-remove-erase-idiom--deep-dive)

📖 [cppreference: Modifying sequence operations](https://en.cppreference.com/w/cpp/algorithm)

---

## Copy and Move

When to Copy vs Move:

- **Copy**: Need data in both places (source stays valid)
- **Move**: Transfer ownership (source becomes empty/invalid)
- **Move is faster** for expensive-to-copy objects (strings, vectors)

### `std::copy` vs. `std::copy_if` vs. `std::copy_backward`

When using `std::copy` or its variations, it's important to know that copy 
requires the destination container to have space for the copied elements. 
The range to copy is `[first, last)`, to another range beginning at `dest_first`.
Trying to copy overlapping ranges from the same container will result in 
undefined behavior. Use `std::copy_backward` to be able to copy overlapping 
ranges within the same container. `std::copy` returns an **output iterator** to 
the element in the destination range that is one past the last element copied.

```cpp
#include <algorithm>
#include <vector>
#include <iterator>
#include <iostream>

int main() {
    std::vector<int> src = {1, 2, 3, 4, 5};

    // Method 1: Pre-sized destination
    std::vector<int> dest(5);  // Must have space!
    std::copy(src.begin(), src.end(), dest.begin());
    // dest: {1, 2, 3, 4, 5}

    // Method 2: Using back_inserter (safer - auto-resizes)
    std::vector<int> dest2;
    std::copy(src.begin(), src.end(), std::back_inserter(dest2));
    // dest2: {1, 2, 3, 4, 5}

    // Copy only even numbers (conditional copy)
    std::vector<int> evens;
    std::copy_if(src.begin(), src.end(), std::back_inserter(evens),
                 [](int x) { return x % 2 == 0; });
    // evens: {2, 4}

    // Copy backward - for overlapping ranges
    std::vector<int> vec = {1, 2, 3, 4, 5};
    // Shift right by 2 positions
    std::copy_backward(vec.begin(), vec.begin() + 3, vec.end());
    // vec: {1, 2, 1, 2, 3} - last 3 elements became first 3

    return 0;
}
```

#### Critical Safety Rule

Trying to copy to a destination container that does not have enough space 
will result in undefined behavior, due to writing past `container.end()`. To 
ensure the container has enough space by growing automatically, use 
`std::back_inserter()`.

```cpp
std::vector<int> dest(3);  // Only 3 elements!

// ❌ UNDEFINED BEHAVIOR - not enough space
std::copy(src.begin(), src.end(), dest.begin());  // Writes past end!

// ✅ SAFE - back_inserter grows container
std::copy(src.begin(), src.end(), std::back_inserter(dest));
```

📖 [cppreference: std::copy](https://en.cppreference.com/w/cpp/algorithm/copy)

---

## Transform

`transform` is like `map()` in functional languages - apply a function to 
each element and store the results in a destination container, which can be 
the source container. Returns an output iterator to the element one past the 
last element transformed.

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

The `fill` and `generate` algorithms can be used to populate containers with 
the same value or generated from a repeatedly-called function that returns the 
expected values. `fill` does not return anything, while `fill_n` returns an 
iterator one past the last element assigned if `count` > 0, otherwise 
returns `first` (i.e. beginning of range). If `count` is <= 0, does nothing.

### `std::fill` vs. `std::fill_n` vs. `std::generate` vs. `std::generate_n`

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
    // N.B.: Overwrites preexisting values.

    // Generate first n elements
    std::generate_n(vec.begin(), 3, []() { return rand() % 100; });
    // vec: {rand_1, rand_2, rand_3, 3, 4}

    return 0;
}
```

📖 [cppreference: std::fill](https://en.cppreference.com/w/cpp/algorithm/fill)

---

## Remove and Replace

**⚠️ Important:** `remove` doesn't actually erase elements! It only moves the 
elements to be removed to the end of the container, and adjusts the container's 
end iterator to one past the new last element, i.e. the first of the moved 
"to-remove" elements. Because `remove` doesn't remove the elements, the 
container size remains unchanged.

**Use the "remove-erase" idiom (below) to ensure elements are properly removed 
from the container.**

### [`std::remove` vs. `std::remove_if`](#stdremove-vs-stdremove_if)

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

### [`std::replace` vs. `std::replace_if`](#stdreplace-vs-stdreplace_if)

`std::replace` replaces every instance of the given value in a range with 
another specified value, modifying the container in place. The `_if` variant 
uses a predicate to determine whether to replace a value in the container, 
only replacing those for which the predicate returns true. Neither `replace` 
nor `replace_if` return a value.

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

## [Unique](#unique)

**⚠️ `unique` removes consecutive duplicates only! Sort first for full 
deduplication.**

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

## [Reverse and Rotate](reverse-and-rotate)

`reverse` reverses the elements in a container in place, and can be used on 
a sub-range of the container `[first, last)`. `rotate` performs a left 
rotation, moving elements such that the element at `middle` becomes the new 
first element (`rotate(first, middle, last)`). Elements in `[first, middle)` 
move to the end, elements in `[middle, last)` move to the beginning. Giving 
a sub-range of the container will result in only those elements being rotated,
the rest of the container will remain the same.

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

## [Shuffle and Partition](#shuffle-and-partition)

### [`std::shuffle`](stdshuffle)

Randomly reorders elements in a range using a specified RNG, replacing 
`std::random_shuffle` which was deprecated in C++11.

```cpp
#include <algorithm>
#include <vector>
#include <random>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};

    std::random_device rd;
    std::mt19937 g(rd()); // Mersenne Twister engine

    std::shuffle(vec.begin(), vec.end(), g);
    // vec: random permutation

    return 0;
}
```

📖 [cppreference: std::shuffle](https://en.cppreference.com/w/cpp/algorithm/random_shuffle)

### `std::partition` vs. `std::stable_partition`

`std::partition` reorders elements so that all elements satisfying the 
predicate come first, but **doesn't preserve relative ordering** within each 
group. The complexity is `O(n)`, with n/2 swaps on average. Returns an 
iterator to the partition point, i.e. the first element of the second group.

`std::stable_partition` does the same thing but preserves relative order 
within each partition. Complexity is `O(n × log(n))` without extra memory 
(alloc failed) and `O(n)` with extra memory. In practice, on modern 
desktop/server systems with gigabytes of RAM, allocation almost never fails 
for reasonable dataset sizes. But on embedded systems or when dealing with 
truly massive datasets, the fallback is essential.

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

### `std::swap` vs. `std::swap_ranges` vs. `std::iter_swap`

`std::swap` exchanges the values of two objects. It works with any 
movable/copyable type, uses move semantics when available, and is 
specialized for containers (e.g. swapping vectors just swaps internal 
pointers, which is `O(1)` instead of `O(n)`).

`std::swap_ranges` swaps the elements between two ranges. Returns iterator 
to one-past-the-last swapped element in the **second** range. The algorithm 
only requires the beginning of the second range and assumes it's large 
enough. If the second range is too small, the behavior is undefined.

`std::iter_swap` swaps the **dereferenced values** pointed to by 
two iterators, not the iterators themselves. Works with any two iterators 
that point to swappable types, and can be from different containers or even 
different types.

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

    std::vector<int> v1 = {1, 2, 3, 4, 5};
    std::vector<int> v2 = {10, 20};  // Too small!

    std::swap_ranges(v1.begin(), v1.end(), v2.begin());
    // ⚠️ Undefined behavior - v2 doesn't have enough elements

    return 0;
}
```

📖 [cppreference: std::swap](https://en.cppreference.com/w/cpp/algorithm/swap)

---

## [The Remove-Erase Idiom: Deep Dive](#the-remove-erase-idiom--deep-dive)

**Why This Matters:**

This is one of the most commonly misunderstood aspects of C++ STL. 
Understanding it is crucial.

### How Remove Actually Works

```cpp
std::vector<int> vec = {1, 2, 3, 2, 4, 2, 5};
//                       0  1  2  3  4  5  6  (indices)

auto new_end = std::remove(vec.begin(), vec.end(), 2);

// What happened internally:
// Step 1: Find first 2 (index 1)
// Step 2: Continue scanning, move non-2 values forward
// Step 3: Return iterator to new "logical end"

// Result:
vec = {1, 3, 4, 5, ?, ?, ?};
//                 ↑
//              new_end (points here)

// Size hasn't changed!
std::cout << vec.size();  // Still 7

// To actually remove:
vec.erase(new_end, vec.end());
std::cout << vec.size();  // Now 4
```

**Visual Walkthrough:**

```text
Original: [1][2][3][2][4][2][5]

Reading: [1][2][3][2][4][2][5]
         ↑  ↑
        write read
 
Keep 1:  [1][2][3][2][4][2][5]
            ↑  ↑
           write read

Skip 2:  [1][2][3][2][4][2][5]
            ↑     ↑
           write  read

Keep 3:  [1][3][3][2][4][2][5]
               ↑     ↑
              write  read

Skip 2:  [1][3][3][2][4][2][5]
               ↑        ↑
              write     read

Keep 4:  [1][3][4][2][4][2][5]
                  ↑        ↑
                 write     read
 
Skip 2:  [1][3][4][2][4][2][5]
                  ↑           ↑
                 write        read
 
Keep 5:  [1][3][4][5][4][2][5]
                     ↑
                   new_end

Result:  [1][3][4][5][?][?][?]
```

### The Complete Pattern

```cpp
// Pattern 1: Remove single value
vec.erase(std::remove(vec.begin(), vec.end(), value), vec.end());

// Pattern 2: Remove by condition
vec.erase(std::remove_if(vec.begin(), vec.end(), 
          [](int x) { return x % 2 == 0; }), 
          vec.end());

// Pattern 3: Remove duplicates (only works on sorted ranges!)
std::sort(vec.begin(), vec.end());
vec.erase(std::unique(vec.begin(), vec.end()), vec.end());
```

### Common Mistakes

```cpp
// ❌ Mistake 1: Forgetting erase
std::remove(vec.begin(), vec.end(), 2);
// Size unchanged, "removed" elements still there!

// ❌ Mistake 2: Using unique on unsorted
std::vector<int> vec = {1, 2, 1, 3, 2};
vec.erase(std::unique(vec.begin(), vec.end()), vec.end());
// Result: {1, 2, 1, 3, 2} - consecutive duplicates removed only!

// ✅ Correct for unique values
std::sort(vec.begin(), vec.end());  // Sort first!
vec.erase(std::unique(vec.begin(), vec.end()), vec.end());
// Result: {1, 2, 3}

// ❌ Mistake 3: Erasing while iterating
for (auto it = vec.begin(); it != vec.end(); ++it) {
    if (*it == 2) {
        vec.erase(it);  // Iterator invalidated! Undefined behavior on ++it
    }
}

// ✅ Correct approach - use remove-erase
vec.erase(std::remove(vec.begin(), vec.end(), 2), vec.end());
```

## Making the Right Choice: Algorithm Selection Guide

### Decision Tree for Modifying Operations

```
What do you want to do?

COPY data
├─ Copy all? → std::copy
├─ Copy conditionally? → std::copy_if
├─ Copy with transformation? → std::transform
└─ Move instead? → std::move

CHANGE values
├─ Replace specific value? → std::replace
├─ Replace by condition? → std::replace_if
└─ Transform each element? → std::transform

REMOVE elements
├─ Remove specific value? → remove + erase
├─ Remove by condition? → remove_if + erase
└─ Remove consecutive duplicates? → unique + erase (sort container first!)

REARRANGE order
├─ Reverse? → std::reverse
├─ Rotate? → std::rotate
├─ Randomize? → std::shuffle
└─ Partition? → std::partition

FILL/GENERATE
├─ Fill with value? → std::fill
└─ Generate values from function? → std::generate
```

### Real-World Scenarios

#### Scenario 1: Data Cleansing

**Problem:** Remove invalid entries from dataset

```cpp
struct Record {
    std::string name;
    int age;
    bool isValid() const { return age > 0 && age < 150; }
};

std::vector<Record> records = {
    {"Alice", 25},
    {"Bob", -5},      // Invalid!
    {"Charlie", 200}, // Invalid!
    {"David", 30}
};

// Remove invalid records
records.erase(
    std::remove_if(records.begin(), records.end(),
        [](const Record& r) { return !r.isValid(); }),
    records.end()
);
// records now: {Alice, David}
```

#### Scenario 2: Data Transformation

**Problem:** Convert temperatures from Celsius to Fahrenheit

```cpp
std::vector<double> celsius = {0, 10, 20, 30, 40};
std::vector<double> fahrenheit(celsius.size());

std::transform(celsius.begin(), celsius.end(), fahrenheit.begin(),
    [](double c) { return c * 9.0 / 5.0 + 32.0; });

// fahrenheit: {32, 50, 68, 86, 104}

// Or in-place transformation:
std::transform(celsius.begin(), celsius.end(), celsius.begin(),
    [](double c) { return c * 9.0 / 5.0 + 32.0; });
```

#### Scenario 3: Combining Multiple Operations

**Problem:** Get unique positive numbers, doubled

```cpp
std::vector<int> numbers = {1, -2, 3, 1, 4, -5, 3, 6};

// Step 1: Remove negatives
numbers.erase(
    std::remove_if(numbers.begin(), numbers.end(),
        [](int x) { return x < 0; }),
    numbers.end()
);
// numbers: {1, 3, 1, 4, 3, 6}

// Step 2: Sort to prepare for unique
std::sort(numbers.begin(), numbers.end());
// numbers: {1, 1, 3, 3, 4, 6}

// Step 3: Remove duplicates
numbers.erase(std::unique(numbers.begin(), numbers.end()), numbers.end());
// numbers: {1, 3, 4, 6}

// Step 4: Double each value
std::transform(numbers.begin(), numbers.end(), numbers.begin(),
    [](int x) { return x * 2; });
// numbers: {2, 6, 8, 12}
```

#### Scenario 4: Rotating Elements

**Problem:** Move oldest elements to end of queue

```cpp
std::vector<std::string> queue = {"old1", "old2", "new1", "new2", "new3"};

// Rotate first 2 elements to end
std::rotate(queue.begin(), queue.begin() + 2, queue.end());
// queue: {"new1", "new2", "new3", "old1", "old2"}

// Real use case: Round-robin task scheduler
void processNextTask(std::vector<Task>& tasks) {
    if (!tasks.empty()) {
        tasks.front().execute();
        // Move processed task to end
        std::rotate(tasks.begin(), tasks.begin() + 1, tasks.end());
    }
}
```

### Performance Characteristics

| Algorithm   | Complexity | In-Place? | Notes                 |
|-------------|------------|-----------|-----------------------|
| `copy`      | `O(n)`     | No        | Requires dest space   |
| `transform` | `O(n)`     | Can be    | Flexible              |
| `replace`   | `O(n)`     | Yes       | Simple value swap     |
| `remove`    | `O(n)`     | Yes*      | Doesn't shrink!       |
| `unique`    | `O(n)`     | Yes*      | Only consecutive      |
| `reverse`   | `O(n)`     | Yes       | Swaps elements        |
| `rotate`    | `O(n)`     | Yes       | Complex but efficient |
| `partition` | `O(n)`     | Yes       | Reorders              |

_*"Yes" = operates on same range, but doesn't actually delete._

### Iterator Invalidation Rules

Invalidation occurs when containers perform operations or have operations 
performed on them that mean the container structure needs to change. 
Changing element values generally doesn't cause iterator invalidation. Using 
invalidated iterators is undefined behavior.

**Critical for Safety:**

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};
auto it = vec.begin() + 2;  // Points to 3

// ⚠️ remove doesn't invalidate (but changes values!)
auto new_end = std::remove(vec.begin(), vec.end(), 2);
// 'it' still valid, but might point to moved element

// ⚠️ erase DOES invalidate
vec.erase(new_end, vec.end());
// If 'it' was in erased range, it's now INVALID

// ✅ Safe pattern: don't hold iterators across modifications
vec.erase(std::remove(vec.begin(), vec.end(), 2), vec.end());
// Don't use any old iterators after this!
```

**Rules by Algorithm:**

- **copy, transform, replace**: Don't invalidate, just modify the values.
- **remove, unique**: Don't invalidate (but change element order) and 
  elements after returned iterator (`new_end`) are unspecified.
- **rotate, reverse, partition**: Don't invalidate, but point to different 
  logical elements.
- **erase (container method)**: Invalidates at and after erased position

### Common Patterns

#### Pattern 1: Transform and Filter

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
std::vector<int> result;

// Get squares of even numbers
std::copy_if(numbers.begin(), numbers.end(), std::back_inserter(result),
    [](int x) { return x % 2 == 0; });
std::transform(result.begin(), result.end(), result.begin(),
    [](int x) { return x * x; });
// result: {4, 16, 36, 64, 100}

// Or combine in one pass with transform_if (not in STL, but could write):
std::for_each(numbers.begin(), numbers.end(), [&result](int x) {
    if (x % 2 == 0) {
        result.push_back(x * x);
    }
});
```

#### Pattern 2: Safe In-Place Modification

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};

// ❌ Dangerous with iterators
for (auto it = vec.begin(); it != vec.end(); /* don't increment here! */) {
    if (*it % 2 == 0) {
        it = vec.erase(it);  // erase returns next valid iterator
    } else {
        ++it;
    }
}

// ✅ Better: use remove_if
vec.erase(std::remove_if(vec.begin(), vec.end(),
    [](int x) { return x % 2 == 0; }), vec.end());
```

#### Pattern 3: Conditional Replace

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};

// Replace all values > 3 with 0
std::replace_if(vec.begin(), vec.end(),
    [](int x) { return x > 3; }, 0);
// vec: {1, 2, 3, 0, 0}
```

## Key Takeaways

✅ **remove/unique** don't actually erase - use **remove-erase idiom**
✅ **_if variants** use predicates
✅ **_copy variants** write to output range without modifying source
✅ **stable_ variants** preserve relative order
✅ **unique** only removes **consecutive** duplicates - sort first for full dedup

---

[← Previous: Module 3](./module-3-non-modifying-operations.md) | [Back to Index](./README.md) | [Next: Module 5 →](./module-5-sorting-algorithms.md)

