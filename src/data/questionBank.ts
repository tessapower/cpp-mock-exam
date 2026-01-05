import type { Question } from '../types/exam.types';

export const QuestionBank: Question[] = [
  // MODULE 1: STL Sequential containers (13 questions)
  {
    id: 1,
    type: "single",
    module: 1,
    question: "What is the time complexity of random access in `std::vector`?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    correct: [0],
    explanation: "`std::vector` provides O(1) random access because elements are stored contiguously in memory, allowing direct index-based access."
  },
  {
    id: 2,
    type: "single",
    module: 1,
    question: "What is the primary advantage of `std::deque` over `std::vector`?",
    options: [
      "Better cache locality",
      "Efficient insertion/deletion at both ends",
      "Lower memory overhead per element",
      "Guaranteed contiguous storage"
    ],
    correct: [1],
    explanation: "`std::deque`'s key advantage is O(1) insertion/deletion at" +
      " both ends, while `std::vector` only offers this at the back."
  },
  {
    id: 3,
    type: "multiple",
    module: 1,
    question: "Which operations are O(1) for `std::list`?",
    options: [
      "Insert at any position given an iterator",
      "Random access by index",
      "Remove element given an iterator",
      "Finding an element by value"
    ],
    correct: [0, 2],
    explanation: "`std::list` provides O(1) insertion and deletion given an iterator, but random access and finding are O(n) due to its linked list structure."
  },
  {
    id: 4,
    type: "single",
    module: 1,
    question: "Which container type NEVER invalidates iterators on insertion (except for erased elements)?",
    options: [
      "`std::vector`",
      "`std::list`",
      "`std::deque`",
      "`std::array`"
    ],
    correct: [1],
    explanation: "`std::list` never invalidates iterators on insertion because elements are not relocated in memory."
  },
  {
    id: 5,
    type: "single",
    module: 1,
    question: "What is a defining characteristic of `std::array`?",
    options: [
      "Size known at runtime",
      "Size must be known at compile time",
      "Can be resized dynamically",
      "Uses heap allocation"
    ],
    correct: [1],
    explanation: "`std::array` requires its size to be known at compile time, making it a fixed-size container."
  },
  {
    id: 6,
    type: "multiple",
    module: 1,
    question: "Which statements about `std::forward_list` are correct?",
    options: [
      "It's a singly-linked list",
      "It provides bidirectional iteration",
      "It has lower memory overhead than std::list",
      "It provides a size() method"
    ],
    correct: [0, 2],
    explanation: "`std::forward_list` is singly-linked (forward-only iteration), has lower overhead than `std::list`, and doesn't provide `size()` for performance reasons."
  },
  {
    id: 7,
    type: "single",
    module: 1,
    question: "What is the primary reason to prefer `std::vector` over `std::list`?",
    options: [
      "Need O(1) middle insertion",
      "Need frequent random access",
      "Need stable iterators",
      "Need bidirectional iteration"
    ],
    correct: [1],
    explanation: "`std::vector` excels at random access with O(1) complexity, while list requires O(n) traversal."
  },
  {
    id: 8,
    type: "single",
    module: 1,
    question: "Which container provides both `reserve()` and `capacity()` methods?",
    options: [
      "`std::list`",
      "`std::vector`",
      "`std::array`",
      "`std::forward_list`"
    ],
    correct: [1],
    explanation: "Only `std::vector` provides both `reserve()` and `capacity()` for managing memory allocation."
  },
  {
    id: 9,
    type: "single",
    module: 1,
    question: "What triggers reallocation in `std::vector` during `push_back()`?",
    options: [
      "Container is empty",
      "Container size exceeds limit",
      "Capacity is full",
      "Always happens"
    ],
    correct: [2],
    explanation: "Reallocation occurs when capacity is exceeded, not just when size increases."
  },
  {
    id: 10,
    type: "single",
    module: 1,
    question: "Which container does NOT support emplace operations?",
    options: [
      "`std::vector`",
      "`std::list`",
      "`std::deque`",
      "`std::array`"
    ],
    correct: [3],
    explanation: "`std::array` is fixed-size and doesn't support insertion operations like `emplace`."
  },
  {
    id: 11,
    type: "multiple",
    module: 1,
    question: "Which statements about `std::deque` are true?",
    options: [
      "Provides O(1) `push_front()`",
      "Elements are guaranteed contiguous",
      "Provides O(1) random access",
      "Better cache locality than `std::vector`"
    ],
    correct: [0, 2],
    explanation: "`std::deque` provides O(1) operations at both ends and O(1) random access. Elements are in chunks, not contiguous, resulting in worse cache locality than vector."
  },
  {
    id: 12,
    type: "single",
    module: 1,
    question: "What is the complexity of `std::list::splice()` for a single element?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)"
    ],
    correct: [0],
    explanation: "`splice()` is O(1) for single elements because it only adjusts pointers, not copying data."
  },
  {
    id: 13,
    type: "multiple",
    module: 1,
    question: "Which containers can be used with `std::stack` adapter?",
    options: [
      "`std::vector`",
      "`std::deque`",
      "`std::list`",
      "`std::forward_list`"
    ],
    correct: [0, 1, 2],
    explanation: "`std::stack` can adapt `std::vector`, `std::deque`, or" +
      " `std::list`. `std::forward_list` doesn't provide the required `back()` operation."
  },

  // MODULE 2: Associative STL containers (14 questions)
  {
    id: 14,
    type: "multiple",
    module: 2,
    question: "Which containers are typically implemented as red-black trees?",
    options: [
      "`std::set`",
      "`std::map`",
      "`std::unordered_map`",
      "`std::multiset`"
    ],
    correct: [0, 1, 3],
    explanation: "`std::set`, `std::map`, `std::multiset`, and" +
      " `std::multimap` are typically red-black trees. `std::unordered_map` uses hash tables."
  },
  {
    id: 15,
    type: "single",
    module: 2,
    question: "What is the average lookup complexity of `std::unordered_map`?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)"
    ],
    correct: [0],
    explanation: "`std::unordered_map` provides O(1) average lookup using" +
      " hashing, requires hashable keys, and doesn't maintain order."
  },
  {
    id: 16,
    type: "multiple",
    module: 2,
    question: "Which `std::map` operations have O(log n) complexity?",
    options: [
      "`find()`",
      "`insert()`",
      "`erase()` by key",
      "`size()`"
    ],
    correct: [0, 1, 2],
    explanation: "`std::map` has O(log n) for `find`, `insert`, and `erase` operations. `size()` is O(1)."
  },
  {
    id: 17,
    type: "multiple",
    module: 2,
    question: "How does `std::multimap` differ from `std::map`?",
    options: [
      "Allows duplicate keys",
      "`operator[]` is not provided",
      "Uses hash table implementation",
      "equal_range() is particularly useful"
    ],
    correct: [0, 1, 3],
    explanation: "multimap allows duplicate keys, doesn't provide `operator[]` (which key would it return?), uses trees not hash tables, and equal_range() finds all values for a key."
  },
  {
    id: 18,
    type: "single",
    module: 2,
    question: "Why doesn't `std::multimap` provide `operator[]`?",
    options: [
      "It would be ambiguous which value to return for duplicate keys",
      "It's a performance optimization",
      "Hash tables don't support `operator[]`",
      "It's deprecated in modern C++"
    ],
    correct: [0],
    explanation: "multimap allows duplicate keys, so `operator[]` would be ambiguous - which of multiple values should it return? Use find() or equal_range() instead."
  },
  {
    id: 19,
    type: "multiple",
    module: 2,
    question: "What happens when you insert into `std::set` with an existing key?",
    options: [
      "The insertion fails",
      "A pair with .second = false is returned",
      "The existing element is replaced",
      "An iterator to the existing element is returned"
    ],
    correct: [0, 1, 3],
    explanation: "Inserting a duplicate into `std::set` fails, returns a pair where second=false and first is an iterator to the existing element."
  },
  {
    id: 20,
    type: "multiple",
    module: 2,
    question: "Which statements about std::map::`operator[]` are correct?",
    options: [
      "Creates a default-constructed value if key doesn't exist",
      "Returns a reference to the value",
      "Can be used to check if a key exists without modification",
      "Requires the value type to be default-constructible"
    ],
    correct: [0, 1, 3],
    explanation: "`operator[]` creates an entry with default value if missing, returns a reference, and requires default construction. Use find() to check existence without modification."
  },
  {
    id: 21,
    type: "multiple",
    module: 2,
    question: "Which containers provide a count() member function?",
    options: [
      "`std::set`",
      "`std::map`",
      "`std::multiset`",
      "`std::vector`"
    ],
    correct: [0, 1, 2],
    explanation: "Associative containers (set, map, multiset, multimap) provide count(). Sequential containers like vector use `std::count` algorithm."
  },
  {
    id: 22,
    type: "multiple",
    module: 2,
    question: "What are the benefits of `std::unordered_set` over `std::set`?",
    options: [
      "Faster average lookup time",
      "Maintains sorted order",
      "Better for existence checks",
      "Lower memory overhead"
    ],
    correct: [0, 2],
    explanation: "unordered_set has O(1) average lookup vs O(log n), making it better for existence checks. It doesn't maintain order and typically has higher memory overhead."
  },
  {
    id: 23,
    type: "multiple",
    module: 2,
    question: "What are the advantages of std::map::emplace()?",
    options: [
      "Constructs the value in-place",
      "Avoids unnecessary copies",
      "Always faster than insert()",
      "Can construct complex objects directly in the container"
    ],
    correct: [0, 1, 3],
    explanation: "emplace() constructs in-place, avoiding copies and allowing direct construction. It's not always faster if an object is already created."
  },
  {
    id: 24,
    type: "single",
    module: 2,
    question: "When does iterator invalidation occur in `std::map`?",
    options: [
      "When inserting new elements",
      "When erasing the element pointed to",
      "When erasing other elements",
      "Never, except for erased elements"
    ],
    correct: [1],
    explanation: "In std::map, only iterators to erased elements are invalidated. Insert and erase of other elements don't affect existing iterators."
  },
  {
    id: 25,
    type: "single",
    module: 2,
    question: "Which is NOT a valid way to iterate over `std::map`?",
    options: [
      "for (auto& [key, value] : myMap) // structured binding",
      "for (auto& p : myMap) // p.first, p.second",
      "for (auto it = myMap.begin(); it != myMap.end(); ++it)",
      "for (int i = 0; i < myMap.size(); ++i) // index access"
    ],
    correct: [3],
    explanation: "Maps support structured bindings, pair iteration, and iterator loops. They don't support random access by index."
  },
  {
    id: 26,
    type: "multiple",
    module: 2,
    question: "What must you provide for custom types in `std::unordered_set`?",
    options: [
      "Hash function",
      "`operator==`",
      "`operator<`",
      "Copy constructor"
    ],
    correct: [0, 1],
    explanation: "unordered_set requires a hash function and `operator==` for equality comparison. `operator<` is for ordered containers. Copy constructor is generally needed but not specific to unordered_set."
  },
  {
    id: 27,
    type: "single",
    module: 2,
    question: "Which container does NOT allow duplicate keys?",
    options: [
      "`std::multiset`",
      "`std::set`",
      "`std::multimap`",
      "`std::unordered_multiset`"
    ],
    correct: [1],
    explanation: "multiset, multimap, and unordered_multiset allow duplicates. set, map, and their unordered variants allow only unique keys."
  },

  // MODULE 3: Non-modifying operations (13 questions)
  {
    id: 28,
    type: "multiple",
    module: 3,
    question: "Which algorithms are guaranteed to be non-modifying?",
    options: [
      "`std::find`",
      "`std::sort`",
      "`std::count`",
      "std::for_each (with non-modifying function)"
    ],
    correct: [0, 2, 3],
    explanation: "find, count, and for_each with non-modifying functions don't alter elements. sort modifies the sequence order."
  },
  {
    id: 29,
    type: "multiple",
    module: 3,
    question: "What does `std::find` return?",
    options: [
      "An iterator to the found element",
      "An iterator to end() if not found",
      "A boolean indicating if found",
      "The position index if found"
    ],
    correct: [0, 1],
    explanation: "std::find returns an iterator - pointing to the element if found, or to end() if not found."
  },
  {
    id: 30,
    type: "multiple",
    module: 3,
    question: "Which algorithms require a predicate function?",
    options: [
      "`std::find_if`",
      "`std::count_if`",
      "`std::all_of`",
      "`std::find`"
    ],
    correct: [0, 1, 2],
    explanation: "find_if, count_if, and all_of use predicates (functions returning bool). `std::find` searches for a specific value."
  },
  {
    id: 31,
    type: "multiple",
    module: 3,
    question: "Which statements are true about `std::equal`?",
    options: [
      "Compares two ranges element by element",
      "Returns true if all elements match",
      "Modifies elements to make them equal",
      "Can accept a custom comparison function"
    ],
    correct: [0, 1, 3],
    explanation: "std::equal compares ranges element-wise and returns true if equal. It doesn't modify elements and can use custom comparisons."
  },
  {
    id: 32,
    type: "single",
    module: 3,
    question: "Which algorithm checks if all elements satisfy a condition?",
    options: [
      "`std::all_of`",
      "`std::any_of`",
      "`std::none_of`",
      "`std::some_of`"
    ],
    correct: [0],
    explanation: "all_of, any_of, and none_of check predicates on ranges. There is no some_of in the standard."
  },
  {
    id: 33,
    type: "multiple",
    module: 3,
    question: "What does `std::search` find?",
    options: [
      "Finds a subsequence within a sequence",
      "Returns iterator to first occurrence",
      "Returns end() if subsequence not found",
      "Only works with sorted sequences"
    ],
    correct: [0, 1, 2],
    explanation: "std::search finds subsequences and returns an iterator to the first occurrence or end() if not found. It doesn't require sorted data."
  },
  {
    id: 34,
    type: "multiple",
    module: 3,
    question: "What does `std::mismatch` return?",
    options: [
      "A pair of iterators",
      "Iterators pointing to first differing elements",
      "Iterators to end() if ranges match completely",
      "A boolean indicating if ranges match"
    ],
    correct: [0, 1, 2],
    explanation: "std::mismatch returns a pair of iterators to the first position where elements differ, or both point to end() if ranges are equal."
  },
  {
    id: 35,
    type: "multiple",
    module: 3,
    question: "Which algorithms return the count of matching elements?",
    options: [
      "`std::count`",
      "`std::count_if`",
      "`std::accumulate`",
      "`std::for_each`"
    ],
    correct: [0, 1],
    explanation: "count and count_if return the number of matching elements. accumulate performs reduction, and for_each applies a function."
  },
  {
    id: 36,
    type: "multiple",
    module: 3,
    question: "For std::find_if_not, what does it do?",
    options: [
      "Finds first element where predicate returns false",
      "Finds first element where predicate returns true",
      "Returns iterator to found element or end()",
      "Modifies elements that match"
    ],
    correct: [0, 2],
    explanation: "find_if_not finds the first element where the predicate is false and returns an iterator. It doesn't modify elements."
  },
  {
    id: 37,
    type: "multiple",
    module: 3,
    question: "Which statements are true about `std::adjacent_find`?",
    options: [
      "Finds first pair of equal adjacent elements",
      "Can use custom equality predicate",
      "Returns iterator to first of the pair",
      "Requires sorted input"
    ],
    correct: [0, 1, 2],
    explanation: "adjacent_find locates the first pair of equal adjacent elements, accepts custom predicates, returns iterator to first element, and doesn't require sorting."
  },
  {
    id: 38,
    type: "single",
    module: 3,
    question: "Which algorithm finds a subsequence in a sequence?",
    options: [
      "`std::search`",
      "`std::find_first_of`",
      "`std::find_end`",
      "`std::find`"
    ],
    correct: [0],
    explanation: "search finds subsequences, find_first_of finds any of several elements, find_end finds last occurrence of a subsequence, and find searches for single values."
  },
  {
    id: 39,
    type: "single",
    module: 3,
    question: "What does `std::for_each` return?",
    options: [
      "The function object passed to it",
      "void (nothing)",
      "An iterator to the end",
      "A copy of the function after being applied"
    ],
    correct: [0],
    explanation: "std::for_each returns the function object (callable) that was passed in, which may have been modified or accumulated state."
  },
  {
    id: 40,
    type: "multiple",
    module: 3,
    question: "Which statements about `std::lexicographical_compare` are true?",
    options: [
      "Compares ranges element-wise",
      "Uses dictionary-style ordering",
      "Returns bool",
      "Requires both ranges to be same size"
    ],
    correct: [0, 1, 2],
    explanation: "lexicographical_compare does dictionary-style element-wise comparison and returns bool. Ranges can be different sizes."
  },

  // MODULE 4: Modifying STL algorithms (13 questions)
  {
    id: 41,
    type: "multiple",
    module: 4,
    question: "Which algorithms modify a sequence in-place?",
    options: [
      "`std::reverse`",
      "`std::rotate`",
      "`std::shuffle`",
      "`std::copy`"
    ],
    correct: [0, 1, 2],
    explanation: "`reverse`, `rotate`, and `shuffle` modify the input range. `copy` creates a new sequence without modifying the source."
  },
  {
    id: 42,
    type: "multiple",
    module: 4,
    question: "Which statements are true about `std::transform`?",
    options: [
      "Applies a function to each element",
      "Writes results to an output range",
      "Can combine two input ranges",
      "Modifies elements in-place"
    ],
    correct: [0, 1, 2],
    explanation: "transform applies functions and writes to output. It can combine ranges or transform single ranges. It doesn't necessarily modify in-place."
  },
  {
    id: 43,
    type: "multiple",
    module: 4,
    question: "For std::copy, which statements are correct?",
    options: [
      "Returns iterator to end of destination",
      "Can overlap source and destination",
      "Requires sufficient space in destination",
      "Performs element-wise copy"
    ],
    correct: [0, 2, 3],
    explanation: "copy returns output iterator, requires sufficient destination space, and copies elements. Overlapping ranges have undefined behavior - use copy_backward."
  },
  {
    id: 44,
    type: "multiple",
    module: 4,
    question: "Which are STL algorithms (not container members)?",
    options: [
      "`std::remove`",
      "`std::remove_if`",
      "`std::unique`",
      "`std::erase`"
    ],
    correct: [0, 1, 2],
    explanation: "remove, remove_if, and unique shift elements and return new logical end. erase is a container member function, not an algorithm."
  },
  {
    id: 45,
    type: "multiple",
    module: 4,
    question: "What is the remove-erase idiom?",
    options: [
      "Calls `std::remove` followed by container.erase()",
      "Actually removes elements from container",
      "std::remove alone doesn't change container size",
      "Returns a new container"
    ],
    correct: [0, 1, 2],
    explanation: "The idiom calls remove (which returns new logical end) then erase (which actually removes). remove doesn't change size, and the idiom modifies in-place."
  },
  {
    id: 46,
    type: "multiple",
    module: 4,
    question: "For `std::fill` and std::fill_n, what's true?",
    options: [
      "fill assigns a value to all elements in range",
      "fill_n assigns to first n elements",
      "Both modify the container in-place",
      "Both return iterators"
    ],
    correct: [0, 1, 2],
    explanation: "`std::fill` and `std::fill_n` assign values and modify" +
      " in-place. `std::fill` returns `void`, `std::fill_n` returns an iterator."
  },
  {
    id: 47,
    type: "multiple",
    module: 4,
    question: "Which statements are true about `std::replace`?",
    options: [
      "Replaces old value with new value",
      "Modifies sequence in-place",
      "Returns number of replacements",
      "Has an `_if` variant with predicate"
    ],
    correct: [0, 1, 3],
    explanation: "`std::replace` changes values in-place and has a" +
      " `replace_if` variant. It returns `void`, not a count."
  },
  {
    id: 48,
    type: "single",
    module: 4,
    question: "Which algorithm does NOT have a `_copy` variant?",
    options: [
      "`std::remove`",
      "`std::replace`",
      "`std::reverse`",
      "`std::sort`"
    ],
    correct: [3],
    explanation: "Many algorithms have `_copy` variants that write to" +
      " output: `std::remove_copy`, `std::replace_copy`, `std::reverse_copy`." +
      " There's no std::sort_copy."
  },
  {
    id: 49,
    type: "multiple",
    module: 4,
    question: "Which statements about `std::unique` are correct?",
    options: [
      "Removes consecutive duplicate elements",
      "Returns iterator to new logical end",
      "Requires sorted input for full deduplication",
      "Actually deletes elements from container"
    ],
    correct: [0, 1, 2],
    explanation: "`std::unique` removes consecutive duplicates, returns new" +
      " end, works best after sorting. It doesn't actually delete - use" +
      " `std::erase` for that."
  },
  {
    id: 50,
    type: "multiple",
    module: 4,
    question: "Which statements are true about `std::generate`?",
    options: [
      "Assigns values by repeatedly calling a function",
      "The function must take no arguments",
      "Modifies range in-place",
      "Has a generate_n variant"
    ],
    correct: [0, 1, 2, 3],
    explanation: "generate repeatedly calls a nullary function to assign values, modifying in-place. generate_n does this for n elements."
  },
  {
    id: 51,
    type: "multiple",
    module: 4,
    question: "Which statements are true about `std::swap_ranges`?",
    options: [
      "Exchanges elements between two ranges",
      "Ranges must be same size",
      "Returns iterator to end of second range",
      "Can overlap ranges"
    ],
    correct: [0, 1, 2],
    explanation: "swap_ranges exchanges elements between equal-sized ranges and returns iterator. Overlapping ranges are undefined behavior."
  },
  {
    id: 52,
    type: "multiple",
    module: 4,
    question: "Which statements are true about `std::rotate`?",
    options: [
      "Shifts elements circularly",
      "Takes three iterators: first, middle, last",
      "Middle becomes new first",
      "Returns iterator to original first element's new position"
    ],
    correct: [0, 1, 2, 3],
    explanation: "rotate performs circular shift using three iterators, making middle the new beginning, and returns where the original first ended up."
  },
  {
    id: 53,
    type: "multiple",
    module: 4,
    question: "Which statements about `std::partition` are correct?",
    options: [
      "Reorders elements based on predicate",
      "Elements satisfying predicate come first",
      "Returns iterator to first element of second group",
      "Maintains relative order within groups"
    ],
    correct: [0, 1, 2],
    explanation: "partition reorders so predicate-true elements come first, returns partition point. It doesn't maintain order - use stable_partition for that."
  },

  // MODULE 5: Sorting STL algorithms (14 questions)
  {
    id: 54,
    type: "single",
    module: 5,
    question: "What is the average complexity of `std::sort`?",
    options: [
      "O(n log n)",
      "O(log n)",
      "O(n)",
      "O(n²)"
    ],
    correct: [0],
    explanation: "std::sort is O(n log n), requires random access, accepts comparators, but doesn't guarantee stability."
  },
  {
    id: 55,
    type: "single",
    module: 5,
    question: "What distinguishes `std::stable_sort` from `std::sort`?",
    options: [
      "Preserves relative order of equal elements",
      "Always faster than std::sort",
      "Uses less memory",
      "Requires forward iterators only"
    ],
    correct: [0],
    explanation: "stable_sort preserves order of equal elements and may allocate extra memory. It's typically slower and requires random access iterators."
  },
  {
    id: 56,
    type: "multiple",
    module: 5,
    question: "Which statements about `std::lower_bound` are correct?",
    options: [
      "Range must be sorted or partitioned",
      "Returns iterator to first element >= value",
      "Uses binary search",
      "Works with unsorted data"
    ],
    correct: [0, 1, 2],
    explanation: "lower_bound requires sorted data, uses binary search, and returns iterator to first element not less than the value."
  },
  {
    id: 57,
    type: "multiple",
    module: 5,
    question: "Which statements about `std::upper_bound` are correct?",
    options: [
      "Returns iterator to first element > value",
      "Returns iterator to last element <= value",
      "Works on sorted ranges",
      "Has O(log n) complexity with random access"
    ],
    correct: [0, 2, 3],
    explanation: "upper_bound returns iterator to first element greater than value, requires sorted range, and is O(log n) with random access."
  },
  {
    id: 58,
    type: "multiple",
    module: 5,
    question: "For std::equal_range:",
    options: [
      "Returns pair of iterators",
      "First is lower_bound, second is upper_bound",
      "Defines subrange of equal elements",
      "Can be used on unsorted data"
    ],
    correct: [0, 1, 2],
    explanation: "equal_range returns a pair defining the range of equal elements (lower_bound to upper_bound). It requires sorted data."
  },
  {
    id: 59,
    type: "single",
    module: 5,
    question: "What does `std::binary_search` return?",
    options: [
      "A boolean",
      "An iterator to found element",
      "A pair of iterators",
      "An integer position"
    ],
    correct: [0],
    explanation: "binary_search returns bool indicating if element exists in sorted range. Use lower_bound or equal_range to get iterators."
  },
  {
    id: 60,
    type: "multiple",
    module: 5,
    question: "Which sorting operations are stable?",
    options: [
      "`std::stable_sort`",
      "`std::sort`",
      "`std::stable_partition`",
      "`std::partial_sort`"
    ],
    correct: [0, 2],
    explanation: "stable_sort and stable_partition preserve relative order. sort and partial_sort don't guarantee stability."
  },
  {
    id: 61,
    type: "multiple",
    module: 5,
    question: "Which statements about `std::partial_sort` are correct?",
    options: [
      "Sorts first n elements",
      "Remaining elements are in unspecified order",
      "More efficient than full sort for small n",
      "Provides stable sorting guarantee"
    ],
    correct: [0, 1],
    explanation: "partial_sort sorts first n elements and leaves rest unordered. It does NOT guarantee stability and is more efficient than full sort only for small n, but the key distinguishing features are sorting first n and leaving rest unspecified."
  },
  {
    id: 62,
    type: "multiple",
    module: 5,
    question: "Which statements are true about `std::nth_element`?",
    options: [
      "Places nth element in its sorted position",
      "Elements before nth are <= nth",
      "Elements after nth are >= nth",
      "Fully sorts the entire range"
    ],
    correct: [0, 1, 2],
    explanation: "nth_element partitions around the nth element without fully sorting. It's O(n) average case."
  },
  {
    id: 63,
    type: "multiple",
    module: 5,
    question: "Which algorithms require sorted input to work correctly?",
    options: [
      "`std::binary_search`",
      "`std::lower_bound`",
      "`std::includes`",
      "`std::sort`"
    ],
    correct: [0, 1, 2],
    explanation: "binary_search, lower_bound, upper_bound, equal_range, and includes require sorted input. sort produces sorted output."
  },
  {
    id: 64,
    type: "multiple",
    module: 5,
    question: "Which statements about `std::is_sorted` are correct?",
    options: [
      "Checks if range is sorted",
      "Returns boolean",
      "Requires random access iterators",
      "Has O(n) complexity"
    ],
    correct: [0, 1],
    explanation: "is_sorted checks if a range is sorted and returns bool. It works with forward iterators (not just random access) and is O(n)."
  },
  {
    id: 65,
    type: "multiple",
    module: 5,
    question: "What does `std::is_sorted_until` return?",
    options: [
      "Iterator to first unsorted element",
      "end() if fully sorted",
      "Boolean indicating if sorted",
      "Index of first unsorted position"
    ],
    correct: [0, 1],
    explanation: "is_sorted_until returns an iterator to the first element that breaks the sorted order, or end() if fully sorted."
  },
  {
    id: 66,
    type: "multiple",
    module: 5,
    question: "Which are requirements for comparators in sorting algorithms?",
    options: [
      "Must define strict weak ordering",
      "comp(a, a) should return false",
      "If comp(a, b) and comp(b, c), then comp(a, c)",
      "Must be a lambda function"
    ],
    correct: [0, 1],
    explanation: "Comparators must define strict weak ordering with irreflexivity (comp(a,a) = false) and transitivity. They can be functions, functors, or lambdas - not required to be lambdas."
  },
  {
    id: 67,
    type: "multiple",
    module: 5,
    question: "Which statements about `std::partial_sort_copy` are correct?",
    options: [
      "Copies partial sort to destination",
      "Modifies the source range",
      "Destination can be smaller than source",
      "Returns iterator to end of result"
    ],
    correct: [0, 3],
    explanation: "partial_sort_copy copies sorted elements to destination and returns iterator to end. It does NOT modify source (that's a key difference from partial_sort)."
  },

  // MODULE 6: Merging STL algorithms (13 questions)
  {
    id: 68,
    type: "multiple",
    module: 6,
    question: "Which statements about `std::merge` are correct?",
    options: [
      "Both input ranges must be sorted",
      "Output range must be pre-allocated",
      "Results in sorted output",
      "Modifies input ranges"
    ],
    correct: [0, 1, 2],
    explanation: "merge requires sorted inputs, pre-allocated output, and produces sorted results. It doesn't modify inputs."
  },
  {
    id: 69,
    type: "multiple",
    module: 6,
    question: "Which statements about `std::inplace_merge` are correct?",
    options: [
      "Merges two consecutive sorted ranges",
      "Operates in-place",
      "May require additional memory",
      "Faster than std::merge"
    ],
    correct: [0, 1, 2],
    explanation: "inplace_merge merges consecutive sorted ranges in-place, may use extra memory for efficiency, and is generally slower than merge with separate output."
  },
  {
    id: 70,
    type: "multiple",
    module: 6,
    question: "Which algorithms require sorted input ranges?",
    options: [
      "`std::set_union`",
      "`std::set_intersection`",
      "`std::remove`",
      "`std::merge`"
    ],
    correct: [0, 3],
    explanation: "Set algorithms (set_union, set_intersection, etc.) and merge require sorted input ranges. `std::remove` works on unsorted ranges."
  },
  {
    id: 71,
    type: "multiple",
    module: 6,
    question: "Which statements about `std::set_union` are correct?",
    options: [
      "Returns elements in either range",
      "Removes all duplicate occurrences",
      "Requires sorted input",
      "Works on unsorted ranges"
    ],
    correct: [0, 2],
    explanation: "set_union returns elements in either range and requires sorted input. It handles duplicates using multiset semantics (max count), not removing all duplicates."
  },
  {
    id: 72,
    type: "multiple",
    module: 6,
    question: "Which statements about `std::set_intersection` are correct?",
    options: [
      "Returns elements present in both ranges",
      "Returns iterator to end of output",
      "Maintains duplicates from inputs",
      "Requires sorted ranges"
    ],
    correct: [0, 1, 3],
    explanation: "set_intersection returns common elements, returns output iterator, requires sorted input. Duplicates appear min(count1, count2) times."
  },
  {
    id: 73,
    type: "multiple",
    module: 6,
    question: "Which statements about `std::set_difference` are correct?",
    options: [
      "Returns elements in first but not second range",
      "Returns elements in second but not first range",
      "Order matters (not commutative)",
      "Requires sorted ranges"
    ],
    correct: [0, 2, 3],
    explanation: "set_difference returns elements in first range not in second. It's not commutative and requires sorted input."
  },
  {
    id: 74,
    type: "multiple",
    module: 6,
    question: "Which statements about `std::set_symmetric_difference` are correct?",
    options: [
      "Returns elements in either range but not both",
      "Equivalent to (A - B) ∪ (B - A)",
      "Works on unsorted ranges",
      "Is commutative"
    ],
    correct: [0, 1],
    explanation: "set_symmetric_difference returns elements in exactly one range (XOR operation). It requires sorted input and is commutative."
  },
  {
    id: 75,
    type: "multiple",
    module: 6,
    question: "Which statements about `std::includes` are correct?",
    options: [
      "Checks if one range is subset of another",
      "Returns boolean",
      "Works on unsorted ranges",
      "Has O(n + m) complexity"
    ],
    correct: [0, 1],
    explanation: "includes checks subset relationship and returns bool. It requires sorted input (not unsorted) and has O(n+m) linear complexity."
  },
  {
    id: 76,
    type: "multiple",
    module: 6,
    question: "Which merging algorithms preserve all duplicates?",
    options: [
      "`std::merge`",
      "`std::set_union`",
      "`std::inplace_merge`",
      "`std::set_intersection`"
    ],
    correct: [0, 2],
    explanation: "merge and inplace_merge preserve all elements including duplicates. Set algorithms treat ranges as multisets with specific duplicate handling."
  },
  {
    id: 77,
    type: "multiple",
    module: 6,
    question: "Which characteristics does `std::merge` have?",
    options: [
      "Stable operation",
      "Quadratic complexity",
      "Requires pre-allocated output",
      "Can merge unsorted ranges"
    ],
    correct: [0, 2],
    explanation: "merge is stable and requires pre-allocated output. It has linear O(n+m) complexity (not quadratic) and needs sorted inputs."
  },
  {
    id: 78,
    type: "multiple",
    module: 6,
    question: "How do set algorithms handle duplicates?",
    options: [
      "set_union: max(count1, count2) occurrences",
      "set_intersection: min(count1, count2) occurrences",
      "set_difference: exactly count1 occurrences",
      "All duplicates are always removed"
    ],
    correct: [0, 1],
    explanation: "Set algorithms use multiset semantics: union takes max count, intersection takes min count. Difference is max(0, count1-count2), and duplicates aren't simply removed."
  },
  {
    id: 79,
    type: "multiple",
    module: 6,
    question: "Which algorithms return an output iterator?",
    options: [
      "`std::merge`",
      "`std::set_union`",
      "`std::includes`",
      "`std::set_intersection`"
    ],
    correct: [0, 1, 3],
    explanation: "Algorithms that write output (merge, set_union, set_intersection, etc.) return output iterators. includes returns bool."
  },
  {
    id: 80,
    type: "multiple",
    module: 6,
    question: "Which statements about `std::inplace_merge` complexity are correct?",
    options: [
      "O(n log n) if extra memory unavailable",
      "O(n) if extra memory available",
      "Always uses O(n) extra memory",
      "Never uses extra memory"
    ],
    correct: [0, 1],
    explanation: "inplace_merge is O(n) with extra memory, O(n log n) without. It may use extra memory if available but isn't required to."
  },

  // MODULE 7: Utilities and functional tools (13 questions)
  {
    id: 81,
    type: "multiple",
    module: 7,
    question: "Which are standard arithmetic functional operators?",
    options: [
      "`std::plus`",
      "`std::minus`",
      "`std::multiplies`",
      "`std::power`"
    ],
    correct: [0, 1, 2],
    explanation: "plus, minus, multiplies, divides, and modulus are provided. There's no power operator in <functional>."
  },
  {
    id: 82,
    type: "multiple",
    module: 7,
    question: "Which comparison operators exist in <functional>?",
    options: [
      "`std::less`",
      "`std::greater`",
      "`std::equal_to`",
      "`std::not_equal`"
    ],
    correct: [0, 1, 2],
    explanation: "less, greater, equal_to, not_equal_to, less_equal, and greater_equal exist. not_equal doesn't exist (it's not_equal_to)."
  },
  {
    id: 83,
    type: "multiple",
    module: 7,
    question: "Which statements about `std::bind1st` are correct?",
    options: [
      "It's deprecated in C++11",
      "Binds first argument of binary function",
      "Returns a unary function",
      "Still recommended for new code"
    ],
    correct: [0, 1, 2],
    explanation: "bind1st is deprecated - use `std::bind` or lambdas instead. It bound the first argument of a binary function."
  },
  {
    id: 84,
    type: "multiple",
    module: 7,
    question: "Which statements about `std::bind2nd` are correct?",
    options: [
      "Deprecated in C++11",
      "Binds second argument",
      "Use `std::bind` or lambdas instead",
      "Required for modern code"
    ],
    correct: [0, 1, 2],
    explanation: "bind2nd is deprecated. Modern code should use `std::bind` or lambda expressions."
  },
  {
    id: 85,
    type: "multiple",
    module: 7,
    question: "Which statements about `std::ptr_fun` are correct?",
    options: [
      "Adapts function pointers",
      "Deprecated in C++11",
      "Removed in C++17",
      "Still necessary in modern C++"
    ],
    correct: [0, 1, 2],
    explanation: "ptr_fun adapted function pointers to functors, was deprecated in C++11, and removed in C++17. Modern C++ doesn't need it."
  },
  {
    id: 86,
    type: "multiple",
    module: 7,
    question: "Which statements about `std::mem_fun` are correct?",
    options: [
      "Adapts member function pointers",
      "Deprecated in C++11",
      "Still recommended for new code",
      "Use `std::mem_fn` instead"
    ],
    correct: [0, 1],
    explanation: "mem_fun adapted member function pointers and was deprecated in C++11, removed in C++17. Use `std::mem_fn` or lambdas instead."
  },
  {
    id: 87,
    type: "multiple",
    module: 7,
    question: "Which statements about `std::not1` and `std::not2` are correct?",
    options: [
      "Negate unary and binary predicates",
      "Introduced in C++17",
      "Removed in C++20",
      "Use `std::not_fn` in modern code"
    ],
    correct: [0, 3],
    explanation: "not1/not2 negated predicates and were deprecated in C++17, removed in C++20. Use `std::not_fn` in modern code."
  },
  {
    id: 88,
    type: "multiple",
    module: 7,
    question: "Which statements about `std::function` are correct?",
    options: [
      "Type-erased wrapper for callables",
      "Can store lambdas, functors, function pointers",
      "Zero overhead compared to direct calls",
      "Requires <functional> header"
    ],
    correct: [0, 1],
    explanation: "std::function is a polymorphic function wrapper that can store any callable. It has runtime overhead (not zero) and requires <functional>."
  },
  {
    id: 89,
    type: "multiple",
    module: 7,
    question: "Which statements are true about `std::bind`?",
    options: [
      "Binds arguments to callable",
      "Can reorder arguments with placeholders",
      "Always more efficient than lambdas",
      "Deprecated in C++17"
    ],
    correct: [0, 1],
    explanation: "std::bind binds arguments and can reorder with placeholders. It's NOT more efficient than lambdas (usually worse) and is not deprecated."
  },
  {
    id: 90,
    type: "multiple",
    module: 7,
    question: "Which statements about `std::reference_wrapper` are correct?",
    options: [
      "Allows references to be copied",
      "Created with `std::ref` or std::cref",
      "Cannot be used with containers",
      "Requires explicit .get() conversion"
    ],
    correct: [0, 1],
    explanation: "reference_wrapper makes references copyable and is created with ref/cref. It CAN be used with containers and has implicit conversion (not requiring .get())."
  },
  {
    id: 91,
    type: "multiple",
    module: 7,
    question: "What are modern alternatives to deprecated function adapters?",
    options: [
      "Lambda expressions",
      "std::bind with placeholders",
      "`std::ptr_fun`",
      "`std::bind1st`"
    ],
    correct: [0, 1],
    explanation: "Use lambdas and `std::bind` instead of deprecated bind1st, bind2nd, mem_fun, and ptr_fun."
  },
  {
    id: 92,
    type: "multiple",
    module: 7,
    question: "Which statements about `std::mem_fn` are correct?",
    options: [
      "Wraps member function pointers",
      "Works with both pointers and objects",
      "Deprecated in C++17",
      "Requires C++98 or later"
    ],
    correct: [0, 1],
    explanation: "mem_fn wraps member functions and works with objects and pointers. It's NOT deprecated and requires C++11 (not C++98)."
  },
  {
    id: 93,
    type: "multiple",
    module: 7,
    question: "Which statements about `std::not_fn` are correct?",
    options: [
      "Negates any callable",
      "Replaces not1 and not2",
      "Available since C++11",
      "Deprecated in C++20"
    ],
    correct: [0, 1],
    explanation: "not_fn negates any callable and replaced not1/not2. It's available since C++17 (not C++11) and is NOT deprecated."
  },

  // MODULE 8: Advanced input and output (13 questions)
  {
    id: 94,
    type: "multiple",
    module: 8,
    question: "Which are stream manipulators?",
    options: [
      "`std::setw`",
      "`std::setprecision`",
      "`std::endl`",
      "`std::format`"
    ],
    correct: [0, 1, 2],
    explanation: "setw, setprecision, endl, hex, dec, fixed, etc. are manipulators. format is C++20 but not a stream manipulator."
  },
  {
    id: 95,
    type: "multiple",
    module: 8,
    question: "Which statements about `std::stringstream` are correct?",
    options: [
      "Provides in-memory string I/O",
      "Can only read, not write",
      "Useful for string parsing",
      "Requires <iostream> header"
    ],
    correct: [0, 2],
    explanation: "stringstream provides bidirectional in-memory string I/O and is great for parsing. It requires <sstream> (not <iostream>)."
  },
  {
    id: 96,
    type: "multiple",
    module: 8,
    question: "Which are valid stream state flags?",
    options: [
      "std::ios::goodbit",
      "std::ios::badbit",
      "std::ios::okbit",
      "std::ios::eofbit"
    ],
    correct: [0, 1],
    explanation: "goodbit, badbit, failbit, and eofbit are valid stream state flags. There is no 'okbit'."
  },
  {
    id: 97,
    type: "multiple",
    module: 8,
    question: "Which statements about file streams are correct?",
    options: [
      "std::ifstream is for input",
      "std::ofstream is for output",
      "std::fstream can only write",
      "All require <fstream> header"
    ],
    correct: [0, 1],
    explanation: "ifstream is for input, ofstream for output. fstream can do BOTH (not only write). All require <fstream>."
  },
  {
    id: 98,
    type: "multiple",
    module: 8,
    question: "Which statements about `std::setw` are correct?",
    options: [
      "Sets field width for next output",
      "Effect persists across outputs",
      "Pads with fill character",
      "Applies to single output only"
    ],
    correct: [0, 3],
    explanation: "setw sets width for the next output only (applies to single output, doesn't persist). It uses the current fill character for padding."
  },
  {
    id: 99,
    type: "multiple",
    module: 8,
    question: "Which statements about `std::setprecision` are correct?",
    options: [
      "Sets decimal precision",
      "Applies to next output only",
      "Affects floating-point display",
      "Works with fixed or scientific"
    ],
    correct: [0, 2],
    explanation: "setprecision sets decimal places for floats and affects floating-point display. It persists (not just next output) and works with fixed/scientific."
  },
  {
    id: 100,
    type: "multiple",
    module: 8,
    question: "Which are formatting flags?",
    options: [
      "std::ios::left",
      "std::ios::right",
      "std::ios::fixed",
      "std::ios::center"
    ],
    correct: [0, 1],
    explanation: "left and right are alignment flags, fixed is for floating-point. There's no 'center' flag in standard C++."
  },
  {
    id: 101,
    type: "multiple",
    module: 8,
    question: "Which statements about `std::endl` vs '\\n' are correct?",
    options: [
      "endl flushes the buffer",
      "'\\n' doesn't flush",
      "endl is faster",
      "'\\n' is preferred for performance"
    ],
    correct: [0, 1],
    explanation: "endl adds newline AND flushes while '\\n' only adds newline. endl is SLOWER (not faster) making '\\n' preferred for performance."
  },
  {
    id: 102,
    type: "multiple",
    module: 8,
    question: "What are stream seek operations?",
    options: [
      "seekg() for input position",
      "seekp() for output position",
      "readg() gets input position",
      "writep() gets output position"
    ],
    correct: [0, 1],
    explanation: "seekg/seekp move input/output positions. tellg/tellp (not readg/writep) get positions."
  },
  {
    id: 103,
    type: "multiple",
    module: 8,
    question: "Which statements about binary file I/O are correct?",
    options: [
      "Use read() and write() methods",
      "Open with std::ios::binary flag",
      "Automatically converts text encodings",
      "Required for non-text data"
    ],
    correct: [0, 1],
    explanation: "Binary I/O uses read/write and requires binary flag. It prevents (not performs) character translation and is necessary for binary data."
  },
  {
    id: 104,
    type: "multiple",
    module: 8,
    question: "Which manipulators require <iomanip>?",
    options: [
      "`std::setw`",
      "`std::setprecision`",
      "`std::endl`",
      "`std::boolalpha`"
    ],
    correct: [0, 1],
    explanation: "setw and setprecision require <iomanip>. endl and boolalpha are in <iostream>."
  },
  {
    id: 105,
    type: "multiple",
    module: 8,
    question: "Which statements about `std::getline` are correct?",
    options: [
      "Includes delimiter in result",
      "Discards the delimiter",
      "Can specify custom delimiter",
      "Returns the stream"
    ],
    correct: [1, 2],
    explanation: "getline discards the delimiter (doesn't include it), allows custom delimiters, and returns the stream."
  },
  {
    id: 106,
    type: "multiple",
    module: 8,
    question: "Which are valid ios_base::openmode flags?",
    options: [
      "std::ios::in",
      "std::ios::out",
      "std::ios::app",
      "std::ios::read"
    ],
    correct: [0, 1, 2],
    explanation: "in, out, app, trunc, binary, ate are openmode flags. There's no 'read' flag."
  },

  // MODULE 9: Templates (14 questions)
  {
    id: 107,
    type: "single",
    module: 9,
    question: "Which is NOT a template type in C++?",
    options: [
      "Function templates",
      "Class templates",
      "Variable templates",
      "Namespace templates"
    ],
    correct: [3],
    explanation: "C++ has function, class, and variable templates (C++14). There are no namespace templates."
  },
  {
    id: 108,
    type: "multiple",
    module: 9,
    question: "Which statements about template instantiation are correct?",
    options: [
      "Can be explicit",
      "Can be implicit",
      "Happens at compile time",
      "Happens at runtime"
    ],
    correct: [0, 1, 2],
    explanation: "Templates can be instantiated explicitly or implicitly, always at compile time."
  },
  {
    id: 109,
    type: "multiple",
    module: 9,
    question: "Which statements about template specialization are correct?",
    options: [
      "Provides specific implementation for certain types",
      "Can be full or partial",
      "Overrides general template",
      "Only available for class templates"
    ],
    correct: [0, 1, 2],
    explanation: "Specialization provides type-specific implementations, can be full or partial, and works for both function and class templates."
  },
  {
    id: 110,
    type: "multiple",
    module: 9,
    question: "Which statements about 'typename' vs 'class' in templates are correct?",
    options: [
      "Mostly interchangeable in template parameters",
      "typename required for dependent types",
      "class only works with class types",
      "typename is more explicit"
    ],
    correct: [0, 1, 3],
    explanation: "typename and class are mostly interchangeable in template parameters. typename is required for dependent type names and is more explicit."
  },
  {
    id: 111,
    type: "multiple",
    module: 9,
    question: "Which can be non-type template parameters?",
    options: [
      "Integral constants",
      "Pointers",
      "References",
      "Floating-point values (before C++20)"
    ],
    correct: [0, 1, 2],
    explanation: "Non-type parameters can be integers, pointers, references, enums. Floats require C++20."
  },
  {
    id: 112,
    type: "multiple",
    module: 9,
    question: "Which statements about template template parameters are correct?",
    options: [
      "Allow templates as parameters",
      "Enable generic container operations",
      "Use 'template<...> typename T' syntax",
      "Commonly used in practice"
    ],
    correct: [0, 1, 2],
    explanation: "Template template parameters allow templates as arguments, useful for generic code, but relatively uncommon."
  },
  {
    id: 113,
    type: "multiple",
    module: 9,
    question: "Which statements about SFINAE are correct?",
    options: [
      "Substitution Failure Is Not An Error",
      "Removes invalid instantiations from overload set",
      "Enables template metaprogramming",
      "Causes compilation errors"
    ],
    correct: [0, 1, 2],
    explanation: "SFINAE removes invalid template instantiations from consideration without causing errors, enabling metaprogramming."
  },
  {
    id: 114,
    type: "multiple",
    module: 9,
    question: "Which statements about variadic templates are correct?",
    options: [
      "Accept variable number of arguments",
      "Use ... syntax",
      "Available since C++98",
      "Processed via recursion or fold expressions"
    ],
    correct: [0, 1],
    explanation: "Variadic templates accept any number of arguments using ... syntax. They're available since C++11 (not C++98) and are processed recursively or with fold expressions (C++17)."
  },
  {
    id: 115,
    type: "multiple",
    module: 9,
    question: "Which statements about template default arguments are correct?",
    options: [
      "Provide default types for template parameters",
      "Can be used in function templates",
      "Can appear anywhere in parameter list",
      "Must appear at the end"
    ],
    correct: [0, 3],
    explanation: "Default template arguments provide defaults and must come at the end. They work for both function and class templates."
  },
  {
    id: 116,
    type: "multiple",
    module: 9,
    question: "Which statements about template argument deduction are correct?",
    options: [
      "Compiler infers template arguments",
      "Works for function templates",
      "Works for class templates in all C++ versions",
      "Can be explicitly specified"
    ],
    correct: [0, 1],
    explanation: "Deduction infers arguments and works for function templates. CTAD for class templates requires C++17+ (not all versions). Arguments can be explicitly specified."
  },
  {
    id: 117,
    type: "multiple",
    module: 9,
    question: "Which statements about two-phase name lookup are correct?",
    options: [
      "Non-dependent names looked up during template definition",
      "Dependent names looked up during instantiation",
      "Dependent names resolved at definition time",
      "All names resolved immediately"
    ],
    correct: [0, 1],
    explanation: "Two-phase lookup: non-dependent names at definition, dependent names at instantiation (not at definition time). Not all names are resolved immediately."
  },
  {
    id: 118,
    type: "multiple",
    module: 9,
    question: "Which statements about explicit template instantiation are correct?",
    options: [
      "Forces template to be instantiated",
      "Can reduce compile time",
      "Automatically instantiates all specializations",
      "Only works for class templates"
    ],
    correct: [0, 1],
    explanation: "Explicit instantiation forces instantiation and can reduce compile times. It doesn't auto-instantiate all specializations and works for both functions and classes."
  },
  {
    id: 119,
    type: "multiple",
    module: 9,
    question: "Which statements about concepts (C++20) are correct?",
    options: [
      "Named requirements for template parameters",
      "Provide better error messages",
      "Deprecated in C++23",
      "Available in C++17"
    ],
    correct: [0, 1],
    explanation: "Concepts (C++20) are named requirements that provide clearer errors and constrain templates. They're available since C++20 (not C++17) and are NOT deprecated."
  },
  {
    id: 120,
    type: "single",
    module: 9,
    question: "When were template aliases introduced?",
    options: [
      "C++98",
      "C++03",
      "C++11",
      "C++14"
    ],
    correct: [2],
    explanation: "Template aliases using 'using' were introduced in C++11."
  },

  // CODE OUTPUT QUESTIONS - Module 1 (10 questions)
  {
    id: 121,
    type: "single",
    module: 1,
    question: "What is the output of this code? (Assume necessary includes)\n```cpp\nstd::vector<int> vec = {1, 2, 3};\nvec.push_back(4);\nvec.push_back(5);\nstd::cout << vec.size() << \" \" << vec.capacity();\n```",
    options: [
      "5 5",
      "5 6",
      "5 8",
      "Compilation fails"
    ],
    correct: [1],
    explanation: "After adding 2 elements to a vector of size 3, typical implementations double capacity from 3 to 6. Size is 5, capacity is typically 6."
  },
  {
    id: 122,
    type: "single",
    module: 1,
    question: "What is the output? (Assume necessary includes)\n```cpp\nstd::deque<int> d = {1, 2, 3};\nd.push_front(0);\nd.push_back(4);\nstd::cout << d.front() << \" \" << d.back();\n```",
    options: [
      "0 4",
      "1 3",
      "0 3",
      "Compilation fails"
    ],
    correct: [0],
    explanation: "push_front adds 0 to the beginning, push_back adds 4 to the end. Output is \"0 4\"."
  },
  {
    id: 123,
    type: "single",
    module: 1,
    question: "What happens when this code runs?\n```cpp\nstd::array<int, 3> arr = {1, 2, 3};\narr.push_back(4);\nstd::cout << arr.size();\n```",
    options: [
      "3",
      "4",
      "Compilation fails",
      "Runtime exception"
    ],
    correct: [2],
    explanation: "`std::array` has fixed size and doesn't provide push_back(). Compilation fails."
  },
  {
    id: 124,
    type: "single",
    module: 1,
    question: "What is the output?\n```cpp\nstd::list<int> lst = {1, 2, 3, 4};\nauto it = lst.begin();\nstd::advance(it, 2);\nlst.erase(it);\nfor (int x : lst) std::cout << x << \" \";\n```",
    options: [
      "1 2 4 ",
      "1 2 3 ",
      "1 3 4 ",
      "2 3 4 "
    ],
    correct: [0],
    explanation: "advance moves iterator to position 2 (value 3), which is erased. Output: \"1 2 4 \"."
  },
  {
    id: 125,
    type: "multiple",
    module: 1,
    question: "Which statements about this code are correct?\n```cpp\nstd::vector<int> v1 = {1, 2, 3};\nstd::vector<int> v2 = v1;\nv2.push_back(4);\n```",
    options: [
      "v1.size() is 3",
      "v2.size() is 4",
      "v1 and v2 share the same data",
      "v1 is modified when v2 is modified"
    ],
    correct: [0, 1],
    explanation: "v2 is a copy of v1 (deep copy). They don't share data. v1 remains size 3, v2 becomes size 4."
  },
  {
    id: 126,
    type: "single",
    module: 1,
    question: "What is the output?\n```cpp\nstd::stack<int> s;\ns.push(1);\ns.push(2);\ns.push(3);\ns.pop();\nstd::cout << s.top();\n```",
    options: [
      "1",
      "2",
      "3",
      "Undefined behavior"
    ],
    correct: [1],
    explanation: "Stack is LIFO. After pushing 1,2,3 and popping once, top element is 2."
  },
  {
    id: 127,
    type: "single",
    module: 1,
    question: "What happens when this code runs?\n```cpp\nstd::vector<int> vec = {1, 2, 3};\nstd::cout << vec[5];\n```",
    options: [
      "0",
      "Garbage value",
      "Throws std::out_of_range",
      "Undefined behavior"
    ],
    correct: [3],
    explanation: "`operator[]` doesn't perform bounds checking. Accessing out-of-bounds is undefined behavior."
  },
  {
    id: 128,
    type: "single",
    module: 1,
    question: "What is the output?\n```cpp\nstd::vector<int> vec;\nstd::cout << vec.empty() << \" \" << vec.size();\n```",
    options: [
      "true 0",
      "1 0",
      "false 0",
      "0 0"
    ],
    correct: [1],
    explanation: "empty() returns bool (printed as 1 for true), size() is 0. Output: \"1 0\"."
  },
  {
    id: 129,
    type: "single",
    module: 1,
    question: "What is the output?\n```cpp\nstd::priority_queue<int> pq;\npq.push(3);\npq.push(1);\npq.push(4);\nstd::cout << pq.top();\n```",
    options: [
      "4",
      "1",
      "3",
      "Compilation fails"
    ],
    correct: [0],
    explanation: "priority_queue is a max-heap by default. The top element is 4 (the maximum)."
  },
  {
    id: 130,
    type: "single",
    module: 1,
    question: "What is the output?\n```cpp\nstd::forward_list<int> fl = {1, 2, 3};\nstd::cout << fl.size();\n```",
    options: [
      "0",
      "3",
      "Compilation fails",
      "Undefined"
    ],
    correct: [2],
    explanation: "std::forward_list doesn't provide size() method for performance reasons. Compilation fails."
  },

  // CODE OUTPUT QUESTIONS - Module 2 (10 questions)
  {
    id: 131,
    type: "single",
    module: 2,
    question: "What is the output?\n```cpp\nstd::set<int> s = {3, 1, 4, 1, 5};\nfor (int x : s) std::cout << x << \" \";\n```",
    options: [
      "3 1 4 1 5 ",
      "1 3 4 5 ",
      "1 1 3 4 5 ",
      "Compilation fails"
    ],
    correct: [1],
    explanation: "std::set removes duplicates and sorts elements. Output: \"1 3 4 5 \"."
  },
  {
    id: 132,
    type: "single",
    module: 2,
    question: "What is the output?\n```cpp\nstd::map<int, std::string> m;\nm[1] = \"one\";\nm[2] = \"two\";\nstd::cout << m[3];\n```",
    options: [
      "Empty string \"\"",
      "Throws exception",
      "Undefined behavior",
      "Compilation fails"
    ],
    correct: [0],
    explanation: "`operator[]` creates entry with default-constructed value if key doesn't exist. Prints empty string."
  },
  {
    id: 133,
    type: "single",
    module: 2,
    question: "What is the output?\n```cpp\nstd::multiset<int> ms = {1, 2, 2, 3, 3, 3};\nstd::cout << ms.count(2) << \" \" << ms.count(3);\n```",
    options: [
      "1 1",
      "2 3",
      "1 3",
      "2 2"
    ],
    correct: [1],
    explanation: "multiset allows duplicates. count(2) returns 2, count(3) returns 3."
  },
  {
    id: 134,
    type: "multiple",
    module: 2,
    question: "What are the outputs of inserting into a set?\n```cpp\nstd::set<int> s = {1, 2, 3};\nauto [it1, success1] = s.insert(2);\nauto [it2, success2] = s.insert(4);\nstd::cout << success1 << \" \" << success2;\n```",
    options: [
      "Outputs \"0 1\"",
      "Outputs \"false true\"",
      "Uses C++17 structured bindings",
      "Compilation fails without C++17"
    ],
    correct: [0, 2],
    explanation: "insert(2) fails (returns false/0), insert(4) succeeds (returns true/1). Structured bindings require C++17."
  },
  {
    id: 135,
    type: "single",
    module: 2,
    question: "What is the output?\n```cpp\nstd::unordered_map<int, int> m = {{1,10}, {2,20}};\nm[1] = 100;\nstd::cout << m[1] << \" \" << m.size();\n```",
    options: [
      "10 2",
      "100 2",
      "100 3",
      "10 3"
    ],
    correct: [1],
    explanation: "m[1] updates existing value to 100, doesn't add new entry. Output: \"100 2\"."
  },
  {
    id: 136,
    type: "single",
    module: 2,
    question: "What is the output?\n```cpp\nstd::multimap<int, std::string> mm;\nmm.insert({1, \"one\"});\nmm.insert({1, \"uno\"});\nstd::cout << mm[1];\n```",
    options: [
      "one",
      "uno",
      "Compilation fails",
      "Runtime exception"
    ],
    correct: [2],
    explanation: "multimap doesn't provide `operator[]`. Compilation fails."
  },
  {
    id: 137,
    type: "single",
    module: 2,
    question: "What is the output?\n```cpp\nstd::map<int, int> m = {{1,10}, {2,20}, {3,30}};\nm.erase(2);\nstd::cout << m.size() << \" \" << m.count(2);\n```",
    options: [
      "2 0",
      "3 1",
      "2 1",
      "3 0"
    ],
    correct: [0],
    explanation: "erase(2) removes the entry. Size becomes 2, count(2) returns 0."
  },
  {
    id: 138,
    type: "multiple",
    module: 2,
    question: "Which statements about this code are correct?\n```cpp\nstd::set<int> s1 = {1, 2, 3};\nstd::set<int> s2 = {3, 4, 5};\ns1.insert(s2.begin(), s2.end());\n```",
    options: [
      "s1 contains {1, 2, 3, 4, 5}",
      "s1 contains {1, 2, 3, 3, 4, 5}",
      "s2 is emptied",
      "s2 remains unchanged"
    ],
    correct: [0, 3],
    explanation: "insert copies elements from s2 to s1, removing duplicates. s2 remains unchanged. s1 becomes {1,2,3,4,5}."
  },
  {
    id: 139,
    type: "single",
    module: 2,
    question: "What is the output?\n```cpp\nstd::map<std::string, int> m = {{\"a\",1}, {\"b\",2}};\nauto it = m.find(\"c\");\nstd::cout << (it == m.end());\n```",
    options: [
      "0",
      "1",
      "false",
      "Compilation fails"
    ],
    correct: [1],
    explanation: "find(\"c\") returns end() since \"c\" doesn't exist. Comparison is true, printed as 1."
  },
  {
    id: 140,
    type: "single",
    module: 2,
    question: "What is the output?\n```cpp\nstd::unordered_set<int> us = {5, 3, 7, 1};\nus.insert(3);\nstd::cout << us.size();\n```",
    options: [
      "4",
      "5",
      "3",
      "Undefined"
    ],
    correct: [0],
    explanation: "unordered_set doesn't allow duplicates. insert(3) fails, size remains 4."
  },

  // CODE OUTPUT QUESTIONS - Module 3 (10 questions)
  {
    id: 141,
    type: "single",
    module: 3,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3, 4, 5};\nauto it = std::find(v.begin(), v.end(), 3);\nstd::cout << *it;\n```",
    options: [
      "3",
      "2",
      "4",
      "Undefined behavior"
    ],
    correct: [0],
    explanation: "find returns iterator to first occurrence of 3. Dereferencing gives 3."
  },
  {
    id: 142,
    type: "single",
    module: 3,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3, 4, 5};\nint count = std::count_if(v.begin(), v.end(), \n                          [](int x){ return x % 2 == 0; });\nstd::cout << count;\n```",
    options: [
      "2",
      "3",
      "5",
      "Compilation fails"
    ],
    correct: [0],
    explanation: "count_if counts even numbers (2, 4). Output: 2."
  },
  {
    id: 143,
    type: "single",
    module: 3,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3};\nauto it = std::find(v.begin(), v.end(), 5);\nstd::cout << *it;\n```",
    options: [
      "0",
      "5",
      "Undefined behavior",
      "Throws exception"
    ],
    correct: [2],
    explanation: "find returns v.end() when element not found. Dereferencing end() is undefined behavior."
  },
  {
    id: 144,
    type: "multiple",
    module: 3,
    question: "Which are correct about this code?\n```cpp\nstd::vector<int> v1 = {1, 2, 3};\nstd::vector<int> v2 = {1, 2, 3};\nbool eq = std::equal(v1.begin(), v1.end(), v2.begin());\n```",
    options: [
      "eq is true",
      "eq is false",
      "Code compiles successfully",
      "Requires C++14 or later"
    ],
    correct: [0, 2],
    explanation: "Vectors are equal, so eq is true. This code compiles in C++98 and later."
  },
  {
    id: 145,
    type: "single",
    module: 3,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 2, 3, 3, 3};\nauto it = std::adjacent_find(v.begin(), v.end());\nstd::cout << *it;\n```",
    options: [
      "1",
      "2",
      "3",
      "Undefined"
    ],
    correct: [1],
    explanation: "adjacent_find returns iterator to first of first pair of equal adjacent elements (2)."
  },
  {
    id: 146,
    type: "single",
    module: 3,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3, 4, 5};\nbool result = std::all_of(v.begin(), v.end(), \n                         [](int x){ return x > 0; });\nstd::cout << result;\n```",
    options: [
      "0",
      "1",
      "true",
      "Compilation fails"
    ],
    correct: [1],
    explanation: "All elements are > 0, so all_of returns true (printed as 1)."
  },
  {
    id: 147,
    type: "single",
    module: 3,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {5, 3, 7, 2, 8};\nauto it = std::min_element(v.begin(), v.end());\nstd::cout << *it << \" \" << (it - v.begin());\n```",
    options: [
      "2 3",
      "2 4",
      "3 1",
      "5 0"
    ],
    correct: [0],
    explanation: "min_element returns iterator to minimum (2 at index 3). Output: \"2 3\"."
  },
  {
    id: 148,
    type: "multiple",
    module: 3,
    question: "What happens with this code?\n```cpp\nstd::vector<int> v = {1, 2, 3, 4};\nint sum = 0;\nstd::for_each(v.begin(), v.end(), [&sum](int x){ sum += x; });\nstd::cout << sum;\n```",
    options: [
      "Outputs 10",
      "Outputs 0",
      "Lambda captures sum by reference",
      "Compilation fails"
    ],
    correct: [0, 2],
    explanation: "Lambda captures sum by reference and adds all elements. Output: 10."
  },
  {
    id: 149,
    type: "single",
    module: 3,
    question: "What is the output?\n```cpp\nstd::vector<int> haystack = {1, 2, 3, 4, 5};\nstd::vector<int> needle = {3, 4};\nauto it = std::search(haystack.begin(), haystack.end(),\n                      needle.begin(), needle.end());\nstd::cout << (it - haystack.begin());\n```",
    options: [
      "0",
      "2",
      "3",
      "5"
    ],
    correct: [1],
    explanation: "search finds subsequence {3,4} starting at index 2."
  },
  {
    id: 150,
    type: "single",
    module: 3,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3, 2, 1};\nbool isPalindrome = std::equal(v.begin(), v.begin() + v.size()/2,\n                               v.rbegin());\nstd::cout << isPalindrome;\n```",
    options: [
      "0",
      "1",
      "true",
      "Compilation fails"
    ],
    correct: [1],
    explanation: "Compares first half with reversed second half. Vector is palindrome, outputs 1."
  },

  // CODE OUTPUT QUESTIONS - Module 4 (10 questions)
  {
    id: 151,
    type: "single",
    module: 4,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3, 4, 5};\nstd::reverse(v.begin(), v.end());\nfor(int x : v) std::cout << x << \" \";\n```",
    options: [
      "1 2 3 4 5 ",
      "5 4 3 2 1 ",
      "Compilation fails",
      "Undefined behavior"
    ],
    correct: [1],
    explanation: "reverse reverses the vector in-place. Output: \"5 4 3 2 1 \"."
  },
  {
    id: 152,
    type: "single",
    module: 4,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3, 2, 4, 2};\nauto new_end = std::remove(v.begin(), v.end(), 2);\nstd::cout << v.size() << \" \" << (new_end - v.begin());\n```",
    options: [
      "3 3",
      "6 3",
      "3 6",
      "6 6"
    ],
    correct: [1],
    explanation: "remove doesn't change size (still 6), but returns iterator to new logical end (3)."
  },
  {
    id: 153,
    type: "single",
    module: 4,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3, 4, 5};\nstd::replace(v.begin(), v.end(), 3, 30);\nfor(int x : v) std::cout << x << \" \";\n```",
    options: [
      "1 2 3 4 5 ",
      "1 2 30 4 5 ",
      "30 30 30 30 30 ",
      "Compilation fails"
    ],
    correct: [1],
    explanation: "`std::replace` changes all `3` to `30`. Output: \"1 2 30 4 5" +
      " \"."
  },
  {
    id: 154,
    type: "multiple",
    module: 4,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 1, 2, 2, 3, 3};\nauto new_end = std::unique(v.begin(), v.end());\nv.erase(new_end, v.end());\n```",
    options: [
      "v becomes {1, 2, 3}",
      "v size becomes 3",
      "Consecutive duplicates are removed",
      "All duplicates are removed"
    ],
    correct: [0, 1],
    explanation: "unique removes consecutive duplicates, returns new end, works best after sorting. It doesn't actually delete - use erase for that."
  },
  {
    id: 155,
    type: "single",
    module: 4,
    question: "What is the output?\n```cpp\nstd::vector<int> src = {1, 2, 3};\nstd::vector<int> dest(3);\nstd::transform(src.begin(), src.end(), dest.begin(),\n               [](int x){ return x * 2; });\nfor(int x : dest) std::cout << x << \" \";\n```",
    options: [
      "1 2 3 ",
      "2 4 6 ",
      "0 0 0 ",
      "Undefined behavior"
    ],
    correct: [1],
    explanation: "transform applies lambda to each element. Output: \"2 4 6 \"."
  },
  {
    id: 156,
    type: "single",
    module: 4,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3, 4, 5};\nstd::rotate(v.begin(), v.begin() + 2, v.end());\nfor(int x : v) std::cout << x << \" \";\n```",
    options: [
      "1 2 3 4 5 ",
      "3 4 5 1 2 ",
      "2 3 4 5 1 ",
      "5 4 3 2 1 "
    ],
    correct: [1],
    explanation: "rotate moves elements before middle to end. Output: \"3 4 5 1 2 \"."
  },
  {
    id: 157,
    type: "single",
    module: 4,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3};\nstd::vector<int> dest(5);\nstd::copy(v.begin(), v.end(), dest.begin());\nstd::cout << dest[4];\n```",
    options: [
      "0",
      "3",
      "Garbage value",
      "Undefined behavior"
    ],
    correct: [0],
    explanation: "dest is value-initialized to {0,0,0,0,0}. copy fills first 3, dest[4] remains 0."
  },
  {
    id: 158,
    type: "multiple",
    module: 4,
    question: "Which statements are correct?\n```cpp\nstd::vector<int> v = {5, 1, 4, 2, 3};\nstd::partition(v.begin(), v.end(), [](int x){ return x % 2 == 0; });\n```",
    options: [
      "Even numbers come before odd numbers",
      "Relative order is preserved",
      "v is sorted",
      "All even numbers move to the beginning"
    ],
    correct: [0, 3],
    explanation: "partition moves even numbers first, but doesn't preserve order or sort. Evens come before odds."
  },
  {
    id: 159,
    type: "single",
    module: 4,
    question: "What is the output?\n```cpp\nstd::vector<int> v(5);\nstd::fill(v.begin(), v.end(), 7);\nstd::cout << v[0] << \" \" << v[4];\n```",
    options: [
      "0 0",
      "7 7",
      "0 7",
      "7 0"
    ],
    correct: [1],
    explanation: "fill assigns 7 to all elements. Output: \"7 7\"."
  },
  {
    id: 160,
    type: "single",
    module: 4,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3, 4};\nint counter = 0;\nstd::generate(v.begin(), v.end(), [&counter](){ return ++counter; });\nfor(int x : v) std::cout << x << \" \";\n```",
    options: [
      "0 1 2 3 ",
      "1 2 3 4 ",
      "4 3 2 1 ",
      "Compilation fails"
    ],
    correct: [1],
    explanation: "generate calls lambda which increments counter. Output: \"1 2 3 4 \"."
  },

  // CODE OUTPUT QUESTIONS - Module 5 (10 questions)
  {
    id: 161,
    type: "single",
    module: 5,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};\nstd::sort(v.begin(), v.end());\nstd::cout << v[0] << \" \" << v[v.size()-1];\n```",
    options: [
      "1 9",
      "3 6",
      "1 6",
      "9 1"
    ],
    correct: [0],
    explanation: "After sorting: {1,1,2,3,4,5,6,9}. First is 1, last is 9."
  },
  {
    id: 162,
    type: "single",
    module: 5,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3, 4, 5};\nbool found = std::binary_search(v.begin(), v.end(), 3);\nstd::cout << found << \" \" << std::binary_search(v.begin(), v.end(), 6);\n```",
    options: [
      "1 0",
      "true false",
      "0 1",
      "Compilation fails"
    ],
    correct: [0],
    explanation: "binary_search(3) returns true (1), binary_search(6) returns false (0)."
  },
  {
    id: 163,
    type: "single",
    module: 5,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 4, 4, 4, 5};\nauto it = std::lower_bound(v.begin(), v.end(), 4);\nstd::cout << (it - v.begin());\n```",
    options: [
      "0",
      "2",
      "3",
      "5"
    ],
    correct: [1],
    explanation: "lower_bound finds first element >= 4, which is at index 2."
  },
  {
    id: 164,
    type: "multiple",
    module: 5,
    question: "What happens with this code?\n```cpp\nstd::vector<int> v = {3, 1, 4, 1, 5};\nstd::nth_element(v.begin(), v.begin() + 2, v.end());\n```",
    options: [
      "v[2] contains the 3rd smallest element",
      "Elements before v[2] are <= v[2]",
      "v is fully sorted",
      "Elements after v[2] are >= v[2]"
    ],
    correct: [0, 1],
    explanation: "nth_element places 3rd element correctly and partitions around it. Not fully sorted."
  },
  {
    id: 165,
    type: "single",
    module: 5,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 4, 4, 4, 5};\nauto it = std::upper_bound(v.begin(), v.end(), 4);\nstd::cout << (it - v.begin());\n```",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correct: [3],
    explanation: "upper_bound finds first element > 4, which is 5 at index 5."
  },
  {
    id: 166,
    type: "single",
    module: 5,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {5, 2, 8, 1, 9};\nstd::partial_sort(v.begin(), v.begin() + 3, v.end());\nstd::cout << v[0] << \" \" << v[1] << \" \" << v[2];\n```",
    options: [
      "1 2 5",
      "5 2 8",
      "1 2 8",
      "Undefined"
    ],
    correct: [0],
    explanation: "partial_sort sorts first 3 elements: 1, 2, 5."
  },
  {
    id: 167,
    type: "single",
    module: 5,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 3, 2, 5, 4};\nbool sorted = std::is_sorted(v.begin(), v.end());\nstd::cout << sorted;\n```",
    options: [
      "0",
      "1",
      "false",
      "Compilation fails"
    ],
    correct: [0],
    explanation: "Vector is not sorted. is_sorted returns false (printed as 0)."
  },
  {
    id: 168,
    type: "single",
    module: 5,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3, 5, 4};\nauto it = std::is_sorted_until(v.begin(), v.end());\nstd::cout << (it - v.begin());\n```",
    options: [
      "3",
      "4",
      "5",
      "0"
    ],
    correct: [1],
    explanation: "Elements are sorted until index 4 (where 4 < 5 breaks order)."
  },
  {
    id: 169,
    type: "multiple",
    module: 5,
    question: "Which statements are true about `std::partial_sort`?",
    options: [
      "Sorts the entire range",
      "Guarantees that the range is fully sorted",
      "Is stable",
      "Can be more efficient than sort when only a portion needs sorting"
    ],
    correct: [3],
    explanation: "partial_sort only sorts the specified range [first, middle) and is not stable. It's faster than sort only when the sorted portion is small."
  },
  {
    id: 170,
    type: "single",
    module: 5,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3};\nstd::sort(v.begin(), v.end(), [](int a, int b){ return a <= b; });\n```",
    options: [
      "Sorts ascending",
      "Sorts descending",
      "Undefined behavior",
      "Compilation fails"
    ],
    correct: [2],
    explanation: "Comparator must be strict weak ordering. '<=' violates this, causing undefined behavior."
  },

  // CODE OUTPUT QUESTIONS - Module 6 (5 questions)
  {
    id: 171,
    type: "single",
    module: 6,
    question: "What is the output?\n```cpp\nstd::vector<int> v1 = {1, 3, 5};\nstd::vector<int> v2 = {2, 4, 6};\nstd::vector<int> result(6);\nstd::merge(v1.begin(), v1.end(), v2.begin(), v2.end(), result.begin());\nfor(int x : result) std::cout << x << \" \";\n```",
    options: [
      "1 2 3 4 5 6 ",
      "1 3 5 2 4 6 ",
      "Compilation fails",
      "Undefined behavior"
    ],
    correct: [0],
    explanation: "merge combines sorted ranges into sorted output: \"1 2 3 4 5 6 \"."
  },
  {
    id: 172,
    type: "single",
    module: 6,
    question: "What is the output?\n```cpp\nstd::vector<int> v1 = {1, 2, 3};\nstd::vector<int> v2 = {2, 3, 4};\nstd::vector<int> result;\nstd::set_intersection(v1.begin(), v1.end(), v2.begin(), v2.end(),\n                      std::back_inserter(result));\nfor(int x : result) std::cout << x << \" \";\n```",
    options: [
      "1 4 ",
      "2 3 ",
      "1 2 3 4 ",
      "Empty"
    ],
    correct: [1],
    explanation: "set_intersection finds common elements: 2 and 3."
  },
  {
    id: 173,
    type: "multiple",
    module: 6,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {3, 1, 4, 1, 5, 9};\nstd::make_heap(v.begin(), v.end());\nstd::cout << v.front();\n```",
    options: [
      "Outputs 9",
      "Outputs 1",
      "Creates max-heap by default",
      "Creates min-heap by default"
    ],
    correct: [0, 2],
    explanation: "make_heap creates max-heap by default. `front()` is maximum element: 9."
  },
  {
    id: 174,
    type: "single",
    module: 6,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3, 4, 5};\nauto [min_it, max_it] = std::minmax_element(v.begin(), v.end());\nstd::cout << *min_it << \" \" << *max_it;\n```",
    options: [
      "1 5",
      "5 1",
      "Compilation fails without C++17",
      "0 4"
    ],
    correct: [0],
    explanation: "minmax_element returns pair of iterators. Output: \"1 5\"."
  },
  {
    id: 175,
    type: "single",
    module: 6,
    question: "What is the output?\n```cpp\nstd::vector<int> v1 = {1, 2, 3};\nstd::vector<int> v2 = {1, 2};\nbool result = std::includes(v1.begin(), v1.end(), \n                           v2.begin(), v2.end());\nstd::cout << result;\n```",
    options: [
      "0",
      "1",
      "true",
      "Compilation fails"
    ],
    correct: [1],
    explanation: "v1 includes all elements of v2. includes returns true (printed as 1)."
  },

  // CODE OUTPUT QUESTIONS - Module 7 (5 questions)
  {
    id: 176,
    type: "single",
    module: 7,
    question: "What is the output?\n```cpp\nauto add10 = std::bind(std::plus<int>(), std::placeholders::_1, 10);\nstd::cout << add10(5);\n```",
    options: [
      "5",
      "10",
      "15",
      "Compilation fails"
    ],
    correct: [2],
    explanation: "bind creates function that adds 10 to argument. add10(5) = 5+10 = 15."
  },
  {
    id: 177,
    type: "multiple",
    module: 7,
    question: "What happens with this code?\n```cpp\nint value = 5;\nauto f = std::bind([](int& x){ x *= 2; }, value);\nf();\nstd::cout << value;\n```",
    options: [
      "Outputs 5",
      "Outputs 10",
      "bind copies by default",
      "value is modified"
    ],
    correct: [0, 2],
    explanation: "bind copies arguments by default. Lambda modifies the copy, not original. Outputs 5."
  },
  {
    id: 178,
    type: "single",
    module: 7,
    question: "What is the output?\n```cpp\nstd::vector<int> v = {1, 2, 3, 4, 5};\nint count = std::count_if(v.begin(), v.end(),\n                         std::bind(std::greater<int>(), std::placeholders::_1, 3));\nstd::cout << count;\n```",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correct: [0],
    explanation: "Counts elements > 3, which are 4 and 5. Output: 2."
  },
  {
    id: 179,
    type: "single",
    module: 7,
    question: "What is the output?\n```cpp\nstd::function<int(int)> f;\nstd::cout << (f == nullptr);\n```",
    options: [
      "0",
      "1",
      "Compilation fails",
      "Undefined behavior"
    ],
    correct: [1],
    explanation: "Default-constructed `std::function` is empty (nullptr). Comparison is true (1)."
  },
  {
    id: 180,
    type: "single",
    module: 7,
    question: "What is the output?\n```cpp\nstruct S { int value; };\nS s{42};\nauto f = std::mem_fn(&S::value);\nstd::cout << f(s);\n```",
    options: [
      "0",
      "42",
      "Compilation fails",
      "Undefined"
    ],
    correct: [1],
    explanation: "mem_fn wraps member variable access. f(s) returns s.value which is 42."
  },

  // CODE OUTPUT QUESTIONS - Module 8 (5 questions)
  {
    id: 181,
    type: "single",
    module: 8,
    question: "What is the output?\n```cpp\nstd::cout << std::setw(5) << 42 << 43;\n```",
    options: [
      "   4243",
      "42   43",
      "   42   43",
      "4243"
    ],
    correct: [0],
    explanation: "setw(5) applies only to next output (42). Output: \"   4243\"."
  },
  {
    id: 182,
    type: "single",
    module: 8,
    question: "What is the output?\n```cpp\nstd::ostringstream oss;\noss << 10 << \" \" << 20;\nstd::string result = oss.str();\nstd::cout << result;\n```",
    options: [
      "10 20",
      "1020",
      "10",
      "Compilation fails"
    ],
    correct: [0],
    explanation: "ostringstream builds string. Output: \"10 20\"."
  },
  {
    id: 183,
    type: "multiple",
    module: 8,
    question: "What is the output?\n```cpp\nstd::cout << `std::fixed` << std::setprecision(2) << 3.14159;\n```",
    options: [
      "Outputs 3.14",
      "Outputs 3.1",
      "fixed affects all subsequent outputs",
      "setprecision affects only next output"
    ],
    correct: [0, 2],
    explanation: "fixed and setprecision persist. Output: 3.14. setprecision (unlike setw) persists."
  },
  {
    id: 184,
    type: "single",
    module: 8,
    question: "What is the output?\n```cpp\nstd::ifstream file(\"nonexistent.txt\");\nif (file) std::cout << \"OK\";\nelse std::cout << \"FAIL\";\n```",
    options: [
      "OK",
      "FAIL",
      "Throws exception",
      "Undefined behavior"
    ],
    correct: [1],
    explanation: "Opening non-existent file sets fail bit. if(file) is false. Outputs FAIL."
  },
  {
    id: 185,
    type: "single",
    module: 8,
    question: "What is the output?\n```cpp\nstd::istringstream iss(\"123 456\");\nint a, b;\niss >> a >> b;\nstd::cout << a + b;\n```",
    options: [
      "123456",
      "579",
      "123",
      "Compilation fails"
    ],
    correct: [1],
    explanation: "Reads 123 into a, 456 into b. Output: 123+456 = 579."
  },

  // CODE OUTPUT QUESTIONS - Module 9 (5 questions)
  {
    id: 186,
    type: "single",
    module: 9,
    question: "What is the output?\n```cpp\ntemplate<typename T>\nT add(T a, T b) { return a + b; }\nstd::cout << add(1, 2) << \" \" << add(1.5, 2.5);\n```",
    options: [
      "3 4",
      "3 4.0",
      "3.0 4.0",
      "Compilation fails"
    ],
    correct: [0],
    explanation: "Template instantiated for int and double. Output: \"3 4\" (double 4.0 printed as 4)."
  },
  {
    id: 187,
    type: "single",
    module: 9,
    question: "What is the output?\n```cpp\ntemplate<typename T>\nvoid print(T value) { std::cout << value; }\nprint(\"Hello\");\n```",
    options: [
      "Hello",
      "Compilation fails",
      "Runtime error",
      "Undefined behavior"
    ],
    correct: [0],
    explanation: "Template deduces T as const char*. Outputs: Hello."
  },
  {
    id: 188,
    type: "multiple",
    module: 9,
    question: "What is the output?\n```cpp\ntemplate<int N>\nstruct Factorial { \n    static const int value = N * Factorial<N-1>::value; \n};\ntemplate<>\nstruct Factorial<0> { static const int value = 1; };\nstd::cout << Factorial<5>::value;\n```",
    options: [
      "Outputs 120",
      "Outputs 5",
      "Uses template metaprogramming",
      "Computed at runtime"
    ],
    correct: [0, 2],
    explanation: "Template recursion computes 5! = 120 at compile time."
  },
  {
    id: 189,
    type: "single",
    module: 9,
    question: "What is the output?\n```cpp\ntemplate<typename T>\nvoid func(T value) { std::cout << sizeof(value); }\nfunc(10);\nfunc(10.5);\n```",
    options: [
      "4 8",
      "4 4",
      "Implementation-defined",
      "Compilation fails"
    ],
    correct: [2],
    explanation: "sizeof(int) and sizeof(double) are implementation-defined, but typically 4 and 8."
  },
  {
    id: 190,
    type: "single",
    module: 9,
    question: "What is the output?\n```cpp\ntemplate<typename... Args>\nint count(Args... args) { return sizeof...(args); }\nstd::cout << count(1, 2, 3, 4, 5);\n```",
    options: [
      "0",
      "5",
      "15",
      "Compilation fails"
    ],
    correct: [1],
    explanation: "sizeof...(args) returns number of arguments. Output: 5."
  },
  {
    id: 191,
    type: "single",
    module: 1,
    question: "Which operation on `std::vector` is most likely to invalidate all iterators?",
    options: [
      "push_back when capacity is sufficient",
      "push_back when reallocation occurs",
      "front()",
      "`operator[]`"
    ],
    correct: [1],
    explanation: "When `std::vector` needs to reallocate (typically when size exceeds capacity), all iterators, pointers, and references to its elements are invalidated."
  },
  {
    id: 192,
    type: "single",
    module: 1,
    question: "Which container is best suited for frequent insertions and erasures in the middle with stable iterators?",
    options: [
      "`std::vector`",
      "`std::deque`",
      "`std::list`",
      "`std::array`"
    ],
    correct: [2],
    explanation: "`std::list` provides stable iterators and efficient insertion/erasure anywhere in the list given an iterator, at the cost of cache locality."
  },
  {
    id: 193,
    type: "single",
    module: 1,
    question: "Which container guarantees that taking the address of an element remains valid as long as the element is not erased?",
    options: [
      "`std::vector`",
      "`std::list`",
      "`std::deque`",
      "`std::forward_list`"
    ],
    correct: [1],
    explanation: "For std::list, elements are individually allocated nodes and are never moved in memory except when erased, so pointers and references remain valid."
  },
  {
    id: 194,
    type: "multiple",
    module: 1,
    question: "Which statements about std::vector::reserve are correct?",
    options: [
      "reserve may increase capacity but never decreases it",
      "reserve changes the vector's size",
      "reserve can prevent multiple reallocations during push_back",
      "reserve invalidates all iterators if reallocation occurs"
    ],
    correct: [0, 2, 3],
    explanation: "reserve only affects capacity, not size. It can reduce reallocations when many insertions are expected, and if it triggers a reallocation, existing iterators become invalid."
  },
  {
    id: 195,
    type: "single",
    module: 1,
    question: "Which container adapter exposes `front()` and `back()` but not random access by index?",
    options: [
      "`std::stack`",
      "`std::queue`",
      "`std::priority_queue`",
      "`std::array`"
    ],
    correct: [1],
    explanation: "`std::queue` provides access to the front and back elements but deliberately hides random access to enforce FIFO semantics."
  },
  {
    id: 196,
    type: "single",
    module: 1,
    question: "Which container has the best cache locality for sequential iteration over many elements?",
    options: [
      "`std::list`",
      "`std::vector`",
      "`std::deque`",
      "`std::forward_list`"
    ],
    correct: [1],
    explanation: "`std::vector` stores elements contiguously in memory, which usually results in superior cache performance during sequential access."
  },
  {
    id: 197,
    type: "single",
    module: 1,
    question: "What is the effect of calling `shrink_to_fit()` on a `std::vector`?",
    options: [
      "It must reduce capacity to match size",
      "It requests but does not guarantee capacity reduction",
      "It also changes the vector's size",
      "It is not provided by std::vector"
    ],
    correct: [1],
    explanation: "shrink_to_fit is a non-binding request to reduce capacity; an implementation may choose to ignore it. It never changes size."
  },
  {
    id: 198,
    type: "single",
    module: 1,
    question: "Which sequential container does NOT support constant-time size() in the C++ standard?",
    options: [
      "`std::vector`",
      "`std::deque`",
      "`std::list`",
      "`std::forward_list`"
    ],
    correct: [3],
    explanation: "std::forward_list intentionally omits size() to avoid requiring O(n) tracking; size() can be computed manually by iterating if needed."
  },
  {
    id: 199,
    type: "single",
    module: 1,
    question: "Which container is most appropriate to implement a FIFO queue with efficient push and pop at opposite ends?",
    options: [
      "`std::vector`",
      "`std::deque`",
      "`std::list`",
      "`std::array`"
    ],
    correct: [1],
    explanation: "`std::deque` supports efficient insertion and removal at both the front and back, making it a natural underlying container for queue-like behavior."
  },
  {
    id: 200,
    type: "single",
    module: 1,
    question: "What is the complexity of inserting an element in the middle of a `std::vector`?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "Amortized O(1)"
    ],
    correct: [2],
    explanation: "Insertion in the middle of a `std::vector` requires shifting all following elements, giving linear O(n) complexity."
  },
  {
    id: 201,
    type: "single",
    module: 1,
    question: "Which statement about `std::array` is true?",
    options: [
      "Its `size()` is computed in O(n)",
      "It supports dynamic resizing via `resize()`",
      "It can be used with range-based for loops",
      "It does not support `begin()` and `end()`"
    ],
    correct: [2],
    explanation: "`std::array` is a fixed-size container but provides `begin()`/`end()`, making it fully compatible with range-based for loops and algorithms."
  },
  {
    id: 202,
    type: "single",
    module: 1,
    question: "Which container is best if you frequently need to insert elements at both the front and back with minimal overhead?",
    options: [
      "`std::vector`",
      "`std::deque`",
      "`std::array`",
      "`std::forward_list`"
    ],
    correct: [1],
    explanation: "`std::deque` offers efficient `push_front()` and " +
      "`push_back()` operations, unlike `std::vector` which is efficient only at the back."
  },
  {
    id: 203,
    type: "multiple",
    module: 1,
    question: "Which sequential containers provide bidirectional iterators?",
    options: [
      "`std::vector`",
      "`std::list`",
      "`std::deque`",
      "`std::forward_list`"
    ],
    correct: [0, 1, 2],
    explanation: "`std::vector` and `std::deque` provide random-access iterators (which are bidirectional), and `std::list` provides bidirectional iterators. `std::forward_list` is singly linked and only provides forward iterators."
  },
  {
    id: 204,
    type: "multiple",
    module: 1,
    question: "Which statements about container adapters like `std::stack` and `std::queue` are correct?",
    options: [
      "They provide a restricted interface on top of an underlying container",
      "The default underlying container for `std::stack` is std::deque",
      "They always use `std::vector` internally",
      "They cannot be instantiated with user-specified underlying containers"
    ],
    correct: [0, 1],
    explanation: "Adapters expose a limited interface over a configurable underlying container. By default, `std::stack` and `std::queue` use std::deque, but you can choose other containers that meet the requirements."
  },
  {
    id: 205,
    type: "single",
    module: 1,
    question: "Which operation is cheapest for `std::forward_list` compared to `std::list`?",
    options: [
      "Random access by index",
      "Insertion before a known position",
      "Bidirectional iteration",
      "Computing size()"
    ],
    correct: [1],
    explanation: "std::forward_list is optimized for singly linked behavior where insertion before a known position via insert_after is very cheap; it does not support random access or bidirectional iteration."
  },
  {
    id: 206,
    type: "single",
    module: 1,
    question: "Which container guarantees that iterators are not invalidated when inserting at either end, except for iterators to erased elements?",
    options: [
      "`std::deque`",
      "`std::vector`",
      "`std::array`",
      "`std::forward_list`"
    ],
    correct: [0],
    explanation: "`std::deque` typically keeps iterators valid when adding elements at either end, though insertions in the middle may invalidate them."
  },
  {
    id: 207,
    type: "single",
    module: 1,
    question: "Which is the correct way to obtain a C-style array pointer from a std::vector<int> v?",
    options: [
      "`int* p = &v;`",
      "`int* p = v.data();`",
      "`int* p = &v[0];`",
      "`int* p = std::begin(v);`"
    ],
    correct: [1],
    explanation: "The idiomatic way in modern C++ is to use `v.data()`, which returns a pointer to the underlying array (or nullptr if empty). `&v[0]` also works if the vector is non-empty, but `data()` is safer and clearer."
  },
  {
    id: 208,
    type: "single",
    module: 1,
    question: "Which container is most appropriate when you need a fixed-size sequence whose size is known at compile time and stored inline?",
    options: [
      "`std::vector`",
      "`std::array`",
      "`std::deque`",
      "`std::list`"
    ],
    correct: [1],
    explanation: "`std::array` is designed for fixed-size sequences with compile-time length and typically stores elements inline (e.g., on the stack when used as a local variable)."
  },

  // Additional MODULE 2 questions
  {
    id: 209,
    type: "single",
    module: 2,
    question: "Which associative container maintains elements in sorted key order by default?",
    options: [
      "`std::unordered_map`",
      "`std::map`",
      "`std::unordered_set`",
      "`std::unordered_multimap`"
    ],
    correct: [1],
    explanation: "std::map is an ordered associative container and maintains keys in sorted order according to its comparison function."
  },
  {
    id: 210,
    type: "single",
    module: 2,
    question: "Which statement about the key type of `std::unordered_map` is true?",
    options: [
      "It must be an integral type",
      "It must support ``operator<``",
      "It must be hashable and equality comparable",
      "It must be default-constructible"
    ],
    correct: [2],
    explanation: "`std::unordered_map` relies on hashing and equality comparison; it does not require `operator<` or integral keys."
  },
  {
    id: 211,
    type: "multiple",
    module: 2,
    question: "Which operations on `std::unordered_map` can cause rehashing?",
    options: [
      "`insert()`",
      "`erase()`",
      "`reserve()`",
      "`clear()`"
    ],
    correct: [0, 2],
    explanation: "Inserting new elements or reserving more buckets can trigger rehashing. Erase and clear remove elements but may or may not shrink buckets depending on the implementation."
  },
  {
    id: 212,
    type: "single",
    module: 2,
    question: "Which method would you use to traverse all elements in a specific bucket of `std::unordered_set`?",
    options: [
      "begin() / end()",
      "bucket_count()",
      "bucket_begin() / bucket_end()",
      "load_factor()"
    ],
    correct: [2],
    explanation: "bucket_begin(bucket_index) and bucket_end(bucket_index) allow you to iterate specifically over elements in a given bucket of an unordered associative container."
  },
  {
    id: 213,
    type: "single",
    module: 2,
    question: "What is the effect of calling clear() on a `std::map`?",
    options: [
      "Removes all elements but keeps allocated memory",
      "Removes all elements and deallocates all memory",
      "Marks all elements as logically deleted but keeps them",
      "Does nothing"
    ],
    correct: [0],
    explanation: "clear removes all elements but usually retains allocated internal structures so future insertions may reuse them (implementation-dependent but typical)."
  },
  {
    id: 214,
    type: "multiple",
    module: 2,
    question: "Which statements about `std::set` and `std::multiset` are correct?",
    options: [
      "Both maintain elements in sorted order",
      "std::multiset allows duplicate keys",
      "Both provide lower_bound and upper_bound",
      "std::set iterators are random-access"
    ],
    correct: [0, 1, 2],
    explanation: "Both are ordered containers with tree-based iterators (bidirectional). `std::multiset` supports duplicates, and both offer lower_bound/upper_bound."
  },
  {
    id: 215,
    type: "single",
    module: 2,
    question: "Which is the usual complexity of inserting a single element into a `std::map`?",
    options: [
      "Amortized O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    correct: [1],
    explanation: "std::map is typically implemented as a balanced tree, giving O(log n) for insertion, lookup, and erasure by key."
  },
  {
    id: 216,
    type: "single",
    module: 2,
    question: "Which container is best when you frequently need to check for existence of a key with average constant time and ordering is unimportant?",
    options: [
      "`std::map`",
      "`std::unordered_map`",
      "`std::set`",
      "`std::multimap`"
    ],
    correct: [1],
    explanation: "`std::unordered_map` offers average O(1) lookup based on hashing when order does not matter."
  },
  {
    id: 217,
    type: "single",
    module: 2,
    question: "What does std::map::at(key) do if the key is not present?",
    options: [
      "Inserts a default-constructed element",
      "Returns a reference to a static default object",
      "Throws std::out_of_range",
      "Returns a null pointer"
    ],
    correct: [2],
    explanation: "Unlike `operator[]`, at() throws `std::out_of_range` if the key is not found, making it safer when you do not intend to insert."
  },
  {
    id: 218,
    type: "multiple",
    module: 2,
    question: "Which statements about custom key comparison in `std::map` are correct?",
    options: [
      "The comparison function must impose a strict weak ordering",
      "The comparison function is stored as part of the map type",
      "Changing the comparison function after construction is allowed",
      "The comparison can be a function object or lambda type"
    ],
    correct: [0, 1, 3],
    explanation: "The comparator is part of the map's type, must define strict weak ordering, and is typically provided as a functor or lambda type (not changed at runtime)."
  },
  {
    id: 219,
    type: "single",
    module: 2,
    question: "Which container is most appropriate to store a set of unique keys and occasionally iterate over them in sorted order?",
    options: [
      "`std::unordered_set`",
      "`std::set`",
      "`std::multiset`",
      "`std::unordered_multiset`"
    ],
    correct: [1],
    explanation: "std::set maintains keys in sorted order and enforces uniqueness, which fits this scenario."
  },
  {
    id: 220,
    type: "single",
    module: 2,
    question: "Which method on `std::unordered_map` reports the average number of elements per bucket?",
    options: [
      "bucket_count()",
      "max_load_factor()",
      "load_factor()",
      "bucket_size()"
    ],
    correct: [2],
    explanation: "load_factor returns the ratio size()/bucket_count(), representing the average number of elements per bucket."
  },
  {
    id: 221,
    type: "single",
    module: 2,
    question: "Which operation on `std::unordered_set` is guaranteed not to invalidate iterators to existing elements (except erased ones)?",
    options: [
      "rehash()",
      "insert()",
      "erase() of a different element",
      "clear()"
    ],
    correct: [2],
    explanation: "Erasing an element invalidates only iterators to that element. Rehashing and clear can invalidate all iterators. Inserting may invalidate iterators if rehashing occurs."
  },
  {
    id: 222,
    type: "multiple",
    module: 2,
    question: "Which associative containers provide equal_range(key)?",
    options: [
      "`std::map`",
      "`std::multimap`",
      "`std::set`",
      "`std::unordered_map`"
    ],
    correct: [0, 1, 2],
    explanation: "Ordered associative containers (map, multimap, set, multiset) provide equal_range. Unordered containers also provide it, but here the focus is on ordered ones; consult cppreference for precise signatures."
  },
  {
    id: 223,
    type: "single",
    module: 2,
    question: "Which container would you choose to represent a phone book where each person can have multiple phone numbers, and you frequently iterate in sorted order by name?",
    options: [
      "std::multimap<std::string, std::string>",
      "std::unordered_map<std::string, std::string>",
      "std::map<std::string, std::string>",
      "std::unordered_multimap<std::string, std::string>"
    ],
    correct: [0],
    explanation: "std::multimap allows multiple values per key (multiple phone numbers) and maintains keys in sorted order, ideal for this scenario."
  },
  {
    id: 224,
    type: "single",
    module: 2,
    question: "Which operation on `std::map` has average-case constant complexity?",
    options: [
      "find()",
      "insert()",
      "erase() by key",
      "size()"
    ],
    correct: [3],
    explanation: "size() is constant time on map; operations like find, insert, and erase by key are O(log n)."
  },

  // Additional MODULE 3 questions
  {
    id: 225,
    type: "single",
    module: 3,
    question: "Which algorithm would you use to count how many elements in a sequence are equal to a specific value?",
    options: [
      "`std::count`",
      "`std::find`",
      "`std::for_each`",
      "`std::accumulate`"
    ],
    correct: [0],
    explanation: "std::count iterates over the range and counts elements equal to a given value."
  },
  {
    id: 226,
    type: "single",
    module: 3,
    question: "Which algorithm checks if at least one element in a range satisfies a predicate?",
    options: [
      "`std::all_of`",
      "`std::any_of`",
      "`std::none_of`",
      "`std::find`"
    ],
    correct: [1],
    explanation: "std::any_of returns true if any element in the range makes the predicate true."
  },
  {
    id: 227,
    type: "multiple",
    module: 3,
    question: "Which statements about `std::find` and `std::find_if` are correct?",
    options: [
      "std::find compares elements to a given value",
      "std::find_if uses a predicate to test elements",
      "Both return an iterator to the first matching element or end()",
      "std::find_if modifies elements"
    ],
    correct: [0, 1, 2],
    explanation: "Both algorithms are non-modifying; they differ in that find uses value equality while find_if uses a predicate."
  },
  {
    id: 228,
    type: "single",
    module: 3,
    question: "Which algorithm would you use to compute the sum of a sequence of integers in a range?",
    options: [
      "`std::count_if`",
      "`std::accumulate`",
      "`std::for_each`",
      "`std::mismatch`"
    ],
    correct: [1],
    explanation: "`std::accumulate` is the standard algorithm to reduce a range to a single value, such as a sum."
  },
  {
    id: 229,
    type: "multiple",
    module: 3,
    question: "Which statements about `std::for_each` are correct?",
    options: [
      "It applies a function to each element in a range",
      "It can be used with lambdas that capture external state",
      "It returns the function object after traversal",
      "It guarantees parallel execution"
    ],
    correct: [0, 1, 2],
    explanation: "for_each is sequential and returns the callable used, which may have accumulated state through captures or references."
  },
  {
    id: 230,
    type: "single",
    module: 3,
    question: "Which algorithm checks if two ranges contain the same elements in the same order?",
    options: [
      "`std::mismatch`",
      "`std::equal`",
      "`std::search`",
      "`std::adjacent_find`"
    ],
    correct: [1],
    explanation: "std::equal compares two ranges element-by-element and returns true if all corresponding elements are equal."
  },
  {
    id: 231,
    type: "single",
    module: 3,
    question: "Which algorithm would you use to determine whether any element of one range appears in another range?",
    options: [
      "`std::find`",
      "`std::find_first_of`",
      "`std::search`",
      "`std::adjacent_find`"
    ],
    correct: [1],
    explanation: "std::find_first_of searches a range for any element from another range, returning the position of the first match."
  },
  {
    id: 232,
    type: "multiple",
    module: 3,
    question: "Which statements about `std::search` and `std::find_end` are correct?",
    options: [
      "Both look for a subsequence within a sequence",
      "std::search returns the first occurrence",
      "std::find_end returns the last occurrence",
      "Both require sorted input"
    ],
    correct: [0, 1, 2],
    explanation: "search finds the first occurrence of a subsequence, while find_end finds the last. Neither requires the range to be sorted."
  },
  {
    id: 233,
    type: "single",
    module: 3,
    question: "Which algorithm would you use to check if two ranges are lexicographically ordered relative to each other?",
    options: [
      "`std::lexicographical_compare`",
      "`std::mismatch`",
      "`std::equal`",
      "`std::all_of`"
    ],
    correct: [0],
    explanation: "lexicographical_compare performs a dictionary-style comparison of two ranges."
  },
  {
    id: 234,
    type: "single",
    module: 3,
    question: "Which algorithm checks if no elements in a range satisfy a predicate?",
    options: [
      "`std::any_of`",
      "`std::none_of`",
      "`std::all_of`",
      "`std::count_if`"
    ],
    correct: [1],
    explanation: "std::none_of returns true if the predicate is false for all elements in the range."
  },
  {
    id: 235,
    type: "single",
    module: 3,
    question: "Which algorithm can you use to find the first position where two ranges differ?",
    options: [
      "`std::equal`",
      "`std::mismatch`",
      "`std::search`",
      "`std::find_if`"
    ],
    correct: [1],
    explanation: "std::mismatch returns a pair of iterators to the first elements that differ between two ranges."
  },
  {
    id: 236,
    type: "single",
    module: 3,
    question: "Which algorithm would you use to determine how many elements in a range satisfy a given predicate?",
    options: [
      "`std::count_if`",
      "`std::count`",
      "`std::for_each`",
      "`std::any_of`"
    ],
    correct: [0],
    explanation: "std::count_if counts the number of elements for which the predicate returns true."
  },
  {
    id: 237,
    type: "multiple",
    module: 3,
    question: "Which statements about non-modifying algorithms are correct?",
    options: [
      "They never change the values stored in the range",
      "They may move iterators but do not re-order elements",
      "They often return iterators, counts, or booleans",
      "They can only be used with random-access iterators"
    ],
    correct: [0, 1, 2],
    explanation: "Non-modifying algorithms observe the range without altering its content, and they typically return information about it; they work with various iterator categories, not just random-access."
  },
  {
    id: 238,
    type: "single",
    module: 3,
    question: "Which algorithm would you use to efficiently find the minimum element in a range?",
    options: [
      "`std::min_element`",
      "`std::min`",
      "`std::accumulate`",
      "`std::lower_bound`"
    ],
    correct: [0],
    explanation: "min_element scans the range and returns an iterator to the minimal element according to the comparison function."
  },
  {
    id: 239,
    type: "single",
    module: 3,
    question: "Which algorithm checks whether two ranges are permutations of each other (ignoring order)?",
    options: [
      "`std::equal`",
      "`std::is_permutation`",
      "`std::search`",
      "`std::find_first_of`"
    ],
    correct: [1],
    explanation: "is_permutation determines whether two ranges contain the same elements, possibly in different orders."
  },
  {
    id: 240,
    type: "single",
    module: 3,
    question: "Which algorithm can be used to test whether a range is partitioned according to a predicate?",
    options: [
      "`std::is_partitioned`",
      "`std::partition`",
      "`std::adjacent_find`",
      "`std::search`"
    ],
    correct: [0],
    explanation: "is_partitioned checks whether a range is already partitioned into elements for which the predicate is true followed by those for which it is false."
  },

  // Additional MODULE 4 questions
  {
    id: 241,
    type: "single",
    module: 4,
    question: "Which algorithm would you use to reverse a sequence into another sequence, leaving the original unchanged?",
    options: [
      "`std::reverse`",
      "`std::reverse_copy`",
      "`std::rotate`",
      "`std::copy`"
    ],
    correct: [1],
    explanation: "reverse_copy writes the reversed sequence into an output range while leaving the input range intact."
  },
  {
    id: 242,
    type: "single",
    module: 4,
    question: "Which pair of algorithms is commonly used together to remove elements equal to a given value from a `std::vector`?",
    options: [
      "std::remove and std::erase",
      "std::remove_if and std::copy",
      "std::unique and std::sort",
      "std::replace and std::fill"
    ],
    correct: [0],
    explanation: "The remove-erase idiom uses `std::remove` (or remove_if) followed by container.erase(new_end, end()) to actually shrink the container."
  },
  {
    id: 243,
    type: "multiple",
    module: 4,
    question: "Which statements about `std::transform` are correct?",
    options: [
      "It can operate in-place by using the same input and output range",
      "It can combine two input ranges into one output range",
      "It always requires random-access iterators",
      "It does not change the size of any container"
    ],
    correct: [0, 1, 4],
    explanation: "transform works with at least input and output iterators, can operate in-place, and does not change container sizes—it only writes to existing elements."
  },
  {
    id: 244,
    type: "single",
    module: 4,
    question: "Which algorithm is best suited for shuffling elements randomly in a container?",
    options: [
      "`std::shuffle`",
      "`std::random_shuffle`",
      "`std::rotate`",
      "`std::swap_ranges`"
    ],
    correct: [0],
    explanation: "std::shuffle is the modern algorithm for randomizing the order of elements using a uniform random bit generator. random_shuffle is deprecated."
  },
  {
    id: 245,
    type: "single",
    module: 4,
    question: "What does std::fill_n(first, n, value) do?",
    options: [
      "Resizes the container to n elements",
      "Assigns value to the first n elements starting at first",
      "Inserts n copies of value at position first",
      "Copies n elements from another range"
    ],
    correct: [1],
    explanation: "fill_n writes value into the first n elements starting from the iterator first; the caller must ensure enough space."
  },
  {
    id: 246,
    type: "single",
    module: 4,
    question: "Which algorithm removes consecutive duplicates from a range in-place (logically), returning a new logical end?",
    options: [
      "`std::unique`",
      "`std::remove`",
      "`std::remove_if`",
      "`std::partition`"
    ],
    correct: [0],
    explanation: "unique compacts the range by removing consecutive duplicates, returning an iterator to the new logical end of the unique sequence."
  },
  {
    id: 247,
    type: "multiple",
    module: 4,
    question: "Which statements about `std::copy` and `std::copy_backward` are correct?",
    options: [
      "std::copy is safe for non-overlapping ranges",
      "std::copy_backward can handle some overlapping cases",
      "Both algorithms preserve the order of elements",
      "Both algorithms can increase container size"
    ],
    correct: [0, 1, 2],
    explanation: "copy is undefined for overlapping ranges; copy_backward is designed for overlaps where backward copying avoids overwriting. Neither changes container sizes; they only assign."
  },
  {
    id: 248,
    type: "single",
    module: 4,
    question: "Which algorithm would you use to generate a sequence of increasing integers starting from 1 into an existing vector?",
    options: [
      "`std::generate`",
      "`std::iota`",
      "`std::fill_n`",
      "`std::accumulate`"
    ],
    correct: [1],
    explanation: "iota assigns sequentially increasing values starting from a given initial value into a range."
  },
  {
    id: 249,
    type: "single",
    module: 4,
    question: "Which algorithm divides a range into two groups based on a predicate but does not preserve the relative order within groups?",
    options: [
      "`std::stable_partition`",
      "`std::partition`",
      "`std::sort`",
      "`std::rotate`"
    ],
    correct: [1],
    explanation: "partition groups elements by predicate result but does not guarantee stability. stable_partition maintains relative order."
  },
  {
    id: 250,
    type: "single",
    module: 4,
    question: "Which algorithm can be used to swap elements at corresponding positions between two ranges?",
    options: [
      "`std::swap`",
      "`std::swap_ranges`",
      "`std::copy`",
      "`std::transform`"
    ],
    correct: [1],
    explanation: "swap_ranges exchanges elements between two ranges element-wise."
  },
  {
    id: 251,
    type: "single",
    module: 4,
    question: "Which algorithm is specifically designed to randomly rearrange elements using a generator?",
    options: [
      "`std::shuffle`",
      "`std::random_shuffle`",
      "`std::partition`",
      "`std::generate_n`"
    ],
    correct: [0],
    explanation: "std::shuffle takes a uniform random bit generator and produces a random permutation of the input range. random_shuffle is deprecated."
  },
  {
    id: 252,
    type: "multiple",
    module: 4,
    question: "Which statements about modifying algorithms are correct?",
    options: [
      "They may change the values of elements in the range",
      "Some of them may change the physical size of a container",
      "They often work with output iterators",
      "They always require bidirectional iterators"
    ],
    correct: [0, 2],
    explanation: "Modifying algorithms update elements and often write results via output iterators, but they do not themselves change container sizes (erase/remove idioms are used with containers). Many work with forward or input iterators, not strictly bidirectional."
  },
  {
    id: 253,
    type: "single",
    module: 4,
    question: "Which algorithm can be used to fill a range with increasing values produced by repeatedly calling a stateful generator function?",
    options: [
      "`std::fill`",
      "`std::generate`",
      "``std::copy_if``",
      "`std::minmax_element`"
    ],
    correct: [1],
    explanation: "generate invokes a supplied callable for each position, allowing custom or stateful value generation."
  },
  {
    id: 254,
    type: "single",
    module: 4,
    question: "Which algorithm would you use to place all elements greater than a pivot value after all elements less than or equal to it, without fully sorting the range?",
    options: [
      "`std::sort`",
      "`std::partition`",
      "``std::nth_element``",
      "`std::lower_bound`"
    ],
    correct: [1],
    explanation: "partition groups elements according to a predicate (e.g., x <= pivot) without fully sorting."
  },
  {
    id: 255,
    type: "single",
    module: 4,
    question: "Which algorithm applies a binary operation to corresponding elements of two ranges and writes the result into a third range?",
    options: [
      "`std::transform`",
      "`std::copy_if`",
      "`std::accumulate`",
      "`std::adjacent_difference`"
    ],
    correct: [0],
    explanation: "The binary overload of transform takes two input ranges and applies a binary operation to compute each element of the output range."
  },

  // Additional MODULE 5 questions
  {
    id: 256,
    type: "single",
    module: 5,
    question: "Which iterator category is required by `std::sort`?",
    options: [
      "Input iterators",
      "Forward iterators",
      "Bidirectional iterators",
      "Random-access iterators"
    ],
    correct: [3],
    explanation: "`std::sort` requires random-access iterators for efficiency and to perform partitioning operations."
  },
  {
    id: 257,
    type: "single",
    module: 5,
    question: "Which algorithm would you use to check if a range is sorted according to a custom comparator?",
    options: [
      "`std::is_sorted`",
      "`std::is_heap`",
      "`std::binary_search`",
      "`std::stable_sort`"
    ],
    correct: [0],
    explanation: "`is_sorted` accepts an optional comparator and reports whether the range is sorted according to it."
  },
  {
    id: 258,
    type: "single",
    module: 5,
    question: "Which algorithm partially sorts a range so that the smallest k elements are sorted at the beginning, leaving the rest unspecified?",
    options: [
      "``std::nth_element``",
      "`std::partial_sort`",
      "`std::sort`",
      "`std::stable_sort`"
    ],
    correct: [1],
    explanation: "`partial_sort` sorts the subrange [first, middle) and ensures those elements are the smallest in the full range."
  },
  {
    id: 259,
    type: "single",
    module: 5,
    question: "Which algorithm can be used to verify that a range is a heap according to a given comparator?",
    options: [
      "`std::is_sorted`",
      "`std::is_heap`",
      "`std::is_partitioned`",
      "`std::binary_search`"
    ],
    correct: [1],
    explanation: "`is_heap` checks whether the range satisfies the heap property under the given comparator."
  },
  {
    id: 260,
    type: "multiple",
    module: 5,
    question: "Which statements about `std::binary_search` are correct?",
    options: [
      "The range must be sorted according to the same comparator",
      "It returns a boolean indicating presence",
      "It can be combined with `lower_bound` to find the element",
      "It can be used safely on unsorted ranges"
    ],
    correct: [0, 1, 2],
    explanation: "`binary_search` assumes the range is sorted using the same ordering; it reports only whether the value is present. To locate it, use `lower_bound` or `equal_range`."
  },
  {
    id: 261,
    type: "single",
    module: 5,
    question: "Which pair of algorithms would you typically use to find the range of equal elements in a sorted sequence?",
    options: [
      "`std::lower_bound` and `std::upper_bound`",
      "`std::sort` and `std::reverse`",
      "`std::partial_sort` and ``std::nth_element``",
      "`std::make_heap` and `std::sort_heap`"
    ],
    correct: [0],
    explanation: "`lower_bound` and `upper_bound` locate the first element >= value and first element > value, defining the equal range."
  },
  {
    id: 262,
    type: "single",
    module: 5,
    question: "Which algorithm rearranges a range into the next lexicographically greater permutation?",
    options: [
      "`std::sort`",
      "`std::next_permutation`",
      "`std::rotate`",
      "`std::partial_sort`"
    ],
    correct: [1],
    explanation: "`next_permutation` transforms the range into the next lexicographical ordering, or the first if none exists."
  },
  {
    id: 263,
    type: "single",
    module: 5,
    question: "Which algorithm checks if two sorted ranges contain the same elements (as sets)?",
    options: [
      "`std::equal`",
      "`std::includes`",
      "`std::lexicographical_compare`",
      "`std::set_union`"
    ],
    correct: [1],
    explanation: "`includes` can be used symmetrically to check whether each range is a subset of the other, implying equality as sets."
  },
  {
    id: 264,
    type: "multiple",
    module: 5,
    question: "Which statements about `std::stable_sort` are correct?",
    options: [
      "It preserves the relative order of equal elements",
      "It may use extra memory internally",
      "It is usually faster than `std::sort`",
      "It can be used with forward iterators"
    ],
    correct: [0, 1],
    explanation: "`stable_sort` trades some performance and memory for stability; it still requires random-access iterators."
  },
  {
    id: 265,
    type: "single",
    module: 5,
    question: "Which algorithm can be used to partition a sorted range into elements less than a value and those greater or equal, without fully sorting again?",
    options: [
      "`std::sort`",
      "`std::partition`",
      "`std::nth_element`",
      "`std::lower_bound`"
    ],
    correct: [3],
    explanation: "`lower_bound` finds the first element not less than the value, effectively splitting the sorted range into < value and >= value subranges."
  },
  {
    id: 266,
    type: "single",
    module: 5,
    question: "Which algorithm can you use to check if a range is sorted until some position and to get that position?",
    options: [
      "`std::is_sorted`",
      "`std::is_sorted_until`",
      "`std::is_heap_until`",
      "`std::is_partitioned`"
    ],
    correct: [1],
    explanation: "is_sorted_until returns an iterator to the first element that violates sorted order, or end() if the entire range is sorted."
  },
  {
    id: 267,
    type: "single",
    module: 5,
    question: "Which algorithm can be used to create a heap from an unsorted range?",
    options: [
      "`std::make_heap`",
      "`std::push_heap`",
      "`std::pop_heap`",
      "`std::is_heap`"
    ],
    correct: [0],
    explanation: "make_heap rearranges the elements into a heap in-place. push_heap assumes the range is already a heap with one extra element appended."
  },
  {
    id: 268,
    type: "single",
    module: 5,
    question: "Which algorithm would you use after push_heap to remove the largest element while maintaining the heap property?",
    options: [
      "`std::pop_heap`",
      "`std::sort_heap`",
      "`std::next_permutation`",
      "`std::remove`"
    ],
    correct: [0],
    explanation: "pop_heap moves the largest element to the end of the range and restores the heap property on the remaining elements."
  },
  {
    id: 269,
    type: "multiple",
    module: 5,
    question: "Which statements about the comparator used with `std::sort` are correct?",
    options: [
      "It must impose a strict weak ordering",
      "It must return true if the arguments are equal",
      "Violating comparator requirements can lead to undefined behavior",
      "It can be a function object, function pointer, or lambda"
    ],
    correct: [0, 2, 3],
    explanation: "A non-strict comparator (e.g., using <=) breaks invariants and leads to undefined behavior. Comparators can be provided in many forms as long as they satisfy strict weak ordering."
  },

  // Additional MODULE 6 questions
  {
    id: 270,
    type: "single",
    module: 6,
    question: "Which algorithm merges two sorted ranges into a single sorted range stored in-place when the ranges are adjacent?",
    options: [
      "`std::merge`",
      "`std::inplace_merge`",
      "`std::set_union`",
      "`std::copy`"
    ],
    correct: [1],
    explanation: "inplace_merge merges two consecutive sorted subranges in-place. merge writes to a separate output range."
  },
  {
    id: 271,
    type: "single",
    module: 6,
    question: "Which algorithm computes the union of two sorted ranges treating them as sets (or multisets)?",
    options: [
      "`std::set_union`",
      "`std::merge`",
      "`std::includes`",
      "`std::set_difference`"
    ],
    correct: [0],
    explanation: "set_union computes the union of elements from both ranges according to multiset semantics."
  },
  {
    id: 272,
    type: "multiple",
    module: 6,
    question: "Which statements about `std::set_intersection` are correct?",
    options: [
      "It requires both input ranges to be sorted",
      "It writes common elements into an output range",
      "It treats inputs as multisets with multiplicities",
      "It removes all duplicates from the result"
    ],
    correct: [0, 1, 2],
    explanation: "set_intersection outputs elements that appear in both ranges, counting duplicates as min(count1, count2). It assumes sorted inputs."
  },
  {
    id: 273,
    type: "single",
    module: 6,
    question: "Which algorithm checks whether every element of one sorted range is contained in another sorted range?",
    options: [
      "`std::set_union`",
      "`std::includes`",
      "`std::set_difference`",
      "`std::set_symmetric_difference`"
    ],
    correct: [1],
    explanation: "includes returns true if the second range is a subset of the first when both are sorted under the same comparator."
  },
  {
    id: 274,
    type: "single",
    module: 6,
    question: "Which algorithm computes elements that belong to exactly one of the two sorted ranges (but not both)?",
    options: [
      "`std::set_difference`",
      "`std::set_intersection`",
      "`std::set_symmetric_difference`",
      "`std::merge`"
    ],
    correct: [2],
    explanation: "set_symmetric_difference yields elements that are present in one range or the other, but not both."
  },
  {
    id: 275,
    type: "multiple",
    module: 6,
    question: "Which statements about `std::merge` are correct?",
    options: [
      "It preserves the relative order of equivalent elements from each range",
      "It runs in linear time O(n + m)",
      "It can be used on unsorted ranges without preconditions",
      "It requires the output range to be large enough to hold all elements"
    ],
    correct: [0, 1, 3],
    explanation: "merge is stable with respect to each input range, runs linearly in the sum of the sizes, and assumes the output can hold all elements. Inputs must be sorted."
  },
  {
    id: 276,
    type: "single",
    module: 6,
    question: "Which standard algorithm would you use to transform a range into a max-heap?",
    options: [
      "`std::make_heap`",
      "`std::push_heap`",
      "`std::pop_heap`",
      "`std::sort_heap`"
    ],
    correct: [0],
    explanation: "make_heap rearranges the elements of a range so that they form a max-heap."
  },
  {
    id: 277,
    type: "single",
    module: 6,
    question: "After calling `std::pop_heap` on a heap range [first, last), where is the largest element placed?",
    options: [
      "At position first",
      "At position last - 1",
      "Removed from the range",
      "In an unspecified position"
    ],
    correct: [1],
    explanation: "pop_heap moves the largest element to last - 1 and adjusts the remaining range [first, last - 1) to remain a heap."
  },
  {
    id: 278,
    type: "single",
    module: 6,
    question: "Which algorithm can be used to sort a heap range into ascending order?",
    options: [
      "`std::sort`",
      "`std::sort_heap`",
      "`std::make_heap`",
      "`std::next_permutation`"
    ],
    correct: [1],
    explanation: "sort_heap assumes the range is a heap and sorts it into ascending order."
  },
  {
    id: 279,
    type: "multiple",
    module: 6,
    question: "Which statements about `std::minmax_element` are correct?",
    options: [
      "It finds both the minimum and maximum elements in a single pass",
      "It returns a pair of iterators",
      "It may perform fewer comparisons than separate min_element and max_element",
      "It requires random-access iterators"
    ],
    correct: [0, 1, 2],
    explanation: "minmax_element scans once, often using a technique that reduces the total number of comparisons; it only requires forward iterators."
  },
  {
    id: 280,
    type: "single",
    module: 6,
    question: "Which algorithm computes A − B for two sorted ranges A and B (elements in A that are not in B)?",
    options: [
      "`std::set_difference`",
      "`std::set_union`",
      "`std::set_intersection`",
      "`std::set_symmetric_difference`"
    ],
    correct: [0],
    explanation: "set_difference produces elements present in the first sorted range but not in the second."
  },
  {
    id: 281,
    type: "single",
    module: 6,
    question: "Which algorithm would you use to test if a given range already satisfies the heap property?",
    options: [
      "`std::is_heap`",
      "`std::is_sorted`",
      "`std::is_partitioned`",
      "`std::is_permutation`"
    ],
    correct: [0],
    explanation: "is_heap returns true if the range conforms to the heap property under the default or provided comparator."
  },
  {
    id: 282,
    type: "single",
    module: 6,
    question: "Which pair of algorithms is typically used to extend a heap by one element and then remove the largest element?",
    options: [
      "std::push_heap and std::pop_heap",
      "std::make_heap and std::sort_heap",
      "std::set_union and std::set_difference",
      "std::merge and std::inplace_merge"
    ],
    correct: [0],
    explanation: "push_heap assumes the new element is at the end and adjusts the heap; pop_heap then moves the maximum to the end."
  },

  // Additional MODULE 7 questions
  {
    id: 283,
    type: "single",
    module: 7,
    question: "What is `std::function` primarily used for?",
    options: [
      "Defining compile-time constants",
      "Type-erased storage and invocation of callables",
      "Overloading operators",
      "Allocating dynamic memory"
    ],
    correct: [1],
    explanation: "std::function is a polymorphic function wrapper that can store and invoke any callable target with a compatible signature."
  },
  {
    id: 284,
    type: "single",
    module: 7,
    question: "Which header must you include to use `std::function` and `std::bind`?",
    options: [
      "<utility>",
      "<functional>",
      "<algorithm>",
      "<memory>"
    ],
    correct: [1],
    explanation: "Both `std::function` and `std::bind` are declared in the <functional> header."
  },
  {
    id: 285,
    type: "multiple",
    module: 7,
    question: "Which statements about lambda captures are correct?",
    options: [
      "[&] captures all automatic variables by reference",
      "[=] captures all automatic variables by value",
      "Explicit capture lists can mix by-value and by-reference",
      "Lambdas cannot capture this pointer"
    ],
    correct: [0, 1, 2],
    explanation: "Lambdas support rich capture lists including this; [&] and [=] are shorthand for capturing all used variables by reference or value."
  },
  {
    id: 286,
    type: "single",
    module: 7,
    question: "What does std::ref(x) do?",
    options: [
      "Creates a copy of x",
      "Wraps x in a std::reference_wrapper",
      "Allocates x on the heap",
      "Makes x const"
    ],
    correct: [1],
    explanation: "std::ref produces a reference_wrapper that can be copied while still referring to the original object, often used with algorithms and bind."
  },
  {
    id: 287,
    type: "single",
    module: 7,
    question: "In modern C++, what is usually preferred for simple function objects over `std::bind`?",
    options: [
      "`std::mem_fun`",
      "Lambda expressions",
      "`std::bind1st`",
      "`std::not1`"
    ],
    correct: [1],
    explanation: "Lambdas are generally clearer, safer, and more efficient than `std::bind` for most use cases."
  },
  {
    id: 288,
    type: "multiple",
    module: 7,
    question: "Which statements about `std::bind` are correct?",
    options: [
      "It can reorder arguments using placeholders",
      "It can bind some arguments while leaving others unbound",
      "It returns an object that models a callable",
      "It requires all arguments to be bound at once"
    ],
    correct: [0, 1, 2],
    explanation: "bind combines a callable with some bound arguments and placeholders; the result is a callable object. Not all arguments must be bound."
  },
  {
    id: 289,
    type: "single",
    module: 7,
    question: "What does std::not_fn(f) return?",
    options: [
      "The bitwise negation of f",
      "A callable that negates the result of f",
      "A callable that always returns false",
      "A callable that throws on every call"
    ],
    correct: [1],
    explanation: "not_fn takes a callable and returns another callable that returns !f(args...)."
  },
  {
    id: 290,
    type: "single",
    module: 7,
    question: "Which functor from <functional> represents logical AND on boolean values?",
    options: [
      "`std::logical_and`",
      "`std::logical_or`",
      "`std::bit_and`",
      "`std::plus`"
    ],
    correct: [0],
    explanation: "logical_and performs short-circuiting logical conjunction; bit_and operates on bits."
  },
  {
    id: 291,
    type: "single",
    module: 7,
    question: "Which utility allows you to call a member function pointer as if it were a regular function object?",
    options: [
      "`std::mem_fn`",
      "`std::bind1st`",
      "`std::ptr_fun`",
      "`std::not1`"
    ],
    correct: [0],
    explanation: "mem_fn wraps a pointer-to-member so that it can be called with an object or pointer to object like a regular callable."
  },
  {
    id: 292,
    type: "multiple",
    module: 7,
    question: "Which statements about `std::reference_wrapper` are correct?",
    options: [
      "It can be stored in standard containers",
      "It can be used to simulate containers of references",
      "It provides implicit conversion back to T&",
      "It is movable but not copyable"
    ],
    correct: [0, 1, 2],
    explanation: "reference_wrapper is copyable and implicitly convertible to T&, making it suitable for storing references in containers."
  },
  {
    id: 293,
    type: "single",
    module: 7,
    question: "Which is a disadvantage of `std::function` compared to a templated callable parameter?",
    options: [
      "It cannot store lambdas",
      "It incurs runtime overhead due to type erasure",
      "It cannot store function pointers",
      "It requires C++20 concepts"
    ],
    correct: [1],
    explanation: "std::function uses type erasure and dynamic dispatch, which generally adds runtime overhead compared to template-based callables."
  },
  {
    id: 294,
    type: "single",
    module: 7,
    question: "Which placeholder would you use in `std::bind` to represent the second argument of the resulting callable?",
    options: [
      "std::placeholders::_1",
      "std::placeholders::_2",
      "std::placeholders::_3",
      "std::placeholders::_second"
    ],
    correct: [1],
    explanation: "_1, _2, _3, ... designate the first, second, third, ... arguments of the bound callable."
  },
  {
    id: 295,
    type: "single",
    module: 7,
    question: "Which functional object template computes the sum of two values?",
    options: [
      "`std::minus`",
      "`std::plus`",
      "`std::multiplies`",
      "`std::divides`"
    ],
    correct: [1],
    explanation: "plus<T> implements operator+ for its operands."
  },
  {
    id: 296,
    type: "single",
    module: 7,
    question: "Which header provides `std::hash` for hashing standard types?",
    options: [
      "<functional>",
      "<algorithm>",
      "<hash>",
      "<type_traits>"
    ],
    correct: [0],
    explanation: "std::hash specializations for many standard types are declared in <functional>."
  },

  // Additional MODULE 8 questions
  {
    id: 297,
    type: "single",
    module: 8,
    question: "Which manipulator prints boolean values as 'true' or 'false' instead of '1' or '0'?",
    options: [
      "`std::boolalpha`",
      "`std::showpos`",
      "`std::showbase`",
      "`std::fixed`"
    ],
    correct: [0],
    explanation: "boolalpha switches the stream to textual representation of bool values."
  },
  {
    id: 298,
    type: "single",
    module: 8,
    question: "Which ios flag do you use to open a file for appending output at the end?",
    options: [
      "`std::ios::in`",
      "`std::ios::out`",
      "`std::ios::app`",
      "`std::ios::trunc`"
    ],
    correct: [2],
    explanation: "`app` opens a file in append mode so that writes always go to the end."
  },
  {
    id: 299,
    type: "multiple",
    module: 8,
    question: "Which statements about stream state flags are correct?",
    options: [
      "`fail()` indicates a logical input/output error",
      "`bad()` indicates a serious error such as loss of integrity",
      "`eof()` indicates that end-of-file has been reached",
      "`good()` is true if no error flags are set"
    ],
    correct: [0, 1, 2, 3],
    explanation: "These functions query different aspects of stream state; good() is true only when none of the error flags (fail, bad, eof) are set."
  },
  {
    id: 300,
    type: "single",
    module: 8,
    question: "Which manipulator forces a plus sign to be shown for positive numbers?",
    options: [
      "`std::showbase`",
      "`std::showpos`",
      "`std::uppercase`",
      "`std::boolalpha`"
    ],
    correct: [1],
    explanation: "showpos requests that a leading + be shown for positive numbers."
  },
  {
    id: 301,
    type: "single",
    module: 8,
    question: "Which header must you include to use `std::ostringstream` and `std::istringstream`?",
    options: [
      "<iostream>",
      "<fstream>",
      "<sstream>",
      "<iomanip>"
    ],
    correct: [2],
    explanation: "The stringstream classes are declared in <sstream>."
  },
  {
    id: 302,
    type: "single",
    module: 8,
    question: "What is the typical effect of calling `std::flush` on an output stream?",
    options: [
      "It clears any error flags",
      "It discards the output buffer",
      "It forces the buffered output to be written",
      "It resets formatting flags to defaults"
    ],
    correct: [2],
    explanation: "flush forces any buffered output to be physically written to the underlying device or file."
  },
  {
    id: 303,
    type: "multiple",
    module: 8,
    question: "Which statements about `std::getline` are correct?",
    options: [
      "It reads characters up to a delimiter",
      "By default, the delimiter is '\n'",
      "The delimiter is extracted but not stored in the string",
      "It sets failbit if it reads an empty line"
    ],
    correct: [0, 1, 2],
    explanation: "getline stops at a delimiter (default newline), discarding it. It sets failbit only on I/O errors or if no characters are extracted when EOF is already set."
  },
  {
    id: 304,
    type: "single",
    module: 8,
    question: "Which open mode should you use to truncate an existing file when opening an ofstream?",
    options: [
      "std::ios::app",
      "std::ios::out | std::ios::trunc",
      "std::ios::in | std::ios::app",
      "std::ios::binary"
    ],
    correct: [1],
    explanation: "out|trunc opens the file for output and truncates it to length zero. Trunc is implied by out for ofstream in many implementations, but this combination is explicit."
  },
  {
    id: 305,
    type: "single",
    module: 8,
    question: "Which manipulator changes the base used for integer output to hexadecimal?",
    options: [
      "`std::dec`",
      "`std::hex`",
      "`std::oct`",
      "`std::fixed`"
    ],
    correct: [1],
    explanation: "hex switches the integer base to hexadecimal for subsequent outputs."
  },
  {
    id: 306,
    type: "single",
    module: 8,
    question: "Which function on an input file stream moves the get pointer to a specific position?",
    options: [
      "seekg",
      "seekp",
      "tellg",
      "tellp"
    ],
    correct: [0],
    explanation: "seekg sets the input (get) position; tellg reports it. seekp/tellp are for output (put) position."
  },
  {
    id: 307,
    type: "multiple",
    module: 8,
    question: "Which statements about binary vs text mode are correct?",
    options: [
      "Binary mode suppresses any newline translation",
      "Text mode may translate '\n' to platform-specific sequences",
      "Binary mode is required for reliably writing non-text data",
      "Binary mode automatically compresses data"
    ],
    correct: [0, 1, 2],
    explanation: "Binary mode prevents transformations (e.g., CRLF translation) which is essential for binary data; text mode may perform such translations."
  },
  {
    id: 308,
    type: "single",
    module: 8,
    question: "What happens if an extraction operation (`operator>>`) fails to read the expected type from a stream?",
    options: [
      "The stream closes automatically",
      "The failbit is set on the stream",
      "The program terminates",
      "Nothing happens"
    ],
    correct: [1],
    explanation: "Upon extraction failure (e.g., reading an int from non-numeric input), the stream sets failbit and stops further formatted extraction until the state is cleared."
  },
  {
    id: 309,
    type: "single",
    module: 8,
    question: "Which manipulator prints floating-point values in scientific notation?",
    options: [
      "`std::fixed`",
      "`std::scientific`",
      "`std::hexfloat`",
      "`std::showpos`"
    ],
    correct: [1],
    explanation: "scientific switches floating-point formatting to exponential notation like 1.23e+03."
  },

  // Additional MODULE 9 questions
  {
    id: 310,
    type: "single",
    module: 9,
    question: "Which keyword is used to introduce a function template?",
    options: [
      "template",
      "typename",
      "class",
      "concept"
    ],
    correct: [0],
    explanation: "The template keyword introduces a template declaration; it is followed by a template parameter list."
  },
  {
    id: 311,
    type: "single",
    module: 9,
    question: "What does the 'typename' keyword indicate in a dependent name like T::value_type?",
    options: [
      "That value_type is a template",
      "That value_type is a type",
      "That value_type is a variable",
      "That value_type is a namespace"
    ],
    correct: [1],
    explanation: "When a name depends on a template parameter, typename tells the compiler that it should be treated as a type name."
  },
  {
    id: 312,
    type: "multiple",
    module: 9,
    question: "Which statements about class template partial specialization are correct?",
    options: [
      "It allows providing a specialized implementation for a subset of template arguments",
      "It is not allowed for function templates",
      "It must be declared after the primary template",
      "It can be used to optimize behavior for certain types"
    ],
    correct: [0, 1, 3],
    explanation: "Partial specialization refines behavior for certain patterns of template arguments; only class (and variable) templates support it, not function templates."
  },
  {
    id: 313,
    type: "single",
    module: 9,
    question: "Which C++ standard introduced variadic templates?",
    options: [
      "C++98",
      "C++03",
      "C++11",
      "C++17"
    ],
    correct: [2],
    explanation: "Variadic templates, using parameter packs, were introduced in C++11."
  },
  {
    id: 314,
    type: "single",
    module: 9,
    question: "Which feature allows template arguments for class templates to be deduced from constructor arguments?",
    options: [
      "SFINAE",
      "Template template parameters",
      "Class template argument deduction (CTAD)",
      "Concepts"
    ],
    correct: [2],
    explanation: "CTAD (since C++17) allows the compiler to deduce template arguments for class templates from constructor call syntax."
  },
  {
    id: 315,
    type: "multiple",
    module: 9,
    question: "Which statements about function template overloading are correct?",
    options: [
      "Function templates can be overloaded like regular functions",
      "Non-template overloads can be preferred over template overloads",
      "Template argument deduction participates in overload resolution",
      "Function templates cannot be specialized"
    ],
    correct: [0, 1, 2],
    explanation: "Function templates can both be overloaded and (fully) specialized; non-template overloads are often preferred by overload resolution."
  },
  {
    id: 316,
    type: "single",
    module: 9,
    question: "What is a template parameter pack?",
    options: [
      "A collection of template definitions",
      "A parameter that represents zero or more template arguments",
      "A runtime container of parameters",
      "A C-style array of types"
    ],
    correct: [1],
    explanation: "A parameter pack allows a template parameter to stand for zero or more arguments of a given kind (types, non-type values, etc.)."
  },
  {
    id: 317,
    type: "single",
    module: 9,
    question: "Which construct in C++20 allows you to restrict template parameters using named requirements?",
    options: [
      "constexpr",
      "decltype",
      "concepts",
      "aliases"
    ],
    correct: [2],
    explanation: "Concepts allow you to express constraints on template parameters in a readable and reusable way."
  },
  {
    id: 318,
    type: "multiple",
    module: 9,
    question: "Which statements about SFINAE (Substitution Failure Is Not An Error) are correct?",
    options: [
      "It applies during template argument substitution",
      "It removes invalid overloads from consideration",
      "It is a compile-time mechanism",
      "It always results in a compilation error"
    ],
    correct: [0, 1, 2],
    explanation: "SFINAE prevents invalid template substitutions from causing hard errors, instead removing them from the overload set."
  },
  {
    id: 319,
    type: "single",
    module: 9,
    question: "Which is a correct syntax for a variable template?",
    options: [
      "template<typename T> constexpr T value = T{};",
      "constexpr template<typename T> T value = T{};",
      "template<T> constexpr value = T{};",
      "template<typename T> value = T{};"
    ],
    correct: [0],
    explanation: "Variable templates use the template keyword followed by a declaration of a variable."
  },
  {
    id: 320,
    type: "single",
    module: 9,
    question: "What is the primary benefit of using templates in C++?",
    options: [
      "They reduce compile times",
      "They enable generic programming and code reuse",
      "They replace all macros",
      "They eliminate the need for inheritance"
    ],
    correct: [1],
    explanation: "Templates enable type-generic code, allowing a single implementation to work with many types without sacrificing performance."
  }
];

