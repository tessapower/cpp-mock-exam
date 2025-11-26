# C++ Certified Professional Programmer Exam Prep

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A comprehensive mock exam application to help prepare for the
[C++ Institute's CPP certification exam](https://cppinstitute.org/). This
interactive web application includes 40 randomly-selected questions covering
all key topics of the CPP certification.

## 📚 Study Guide

Check out the [comprehensive study guide](./docs/README.md) with detailed 
examples and explanations for all 9 exam modules.

## 🎯 Features

- **40 Question Mock Exam**: Randomly selected from a bank of questions covering all 9 exam modules
- **65 Minute Timer**: Simulates the actual exam time limit
- **Question Navigator**: Visual overview of answered, marked, and current questions
- **Mark for Review**: Flag questions you want to revisit
- **Detailed Results**: Score breakdown by module with explanations for each answer
- **Exam History**: Track progress across multiple attempts
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tessapower/cpp-mock-exam.git

# Navigate to the project directory
cd cpp-mock-exam

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📚 Exam Structure

The exam consists of **30 items** (questions) with the following distribution:

| Block | Topic                                         | Items | Weight |
|-------|-----------------------------------------------|-------|--------|
| 1     | Sequence Containers and Container Adapters    | 4     | 13.25% |
| 2     | Associative Containers                        | 4     | 13.25% |
| 3     | Algorithms: Non-Modifying Sequence Operations | 4     | 13.25% |
| 4     | Algorithms: Modifying Sequence Operations     | 4     | 13.25% |
| 5     | Algorithms: Sorting and Binary Search         | 5     | 16.5%  |
| 6     | Algorithms: Merge, Heap, Min, Max             | 5     | 16.5%  |
| 7     | STL Functional Objects and Utilities          | 2     | 7%     |
| 8     | Advanced I/O                                  | 2     | 7%     |
| 9     | Templates                                     | 2     | 7%     |

**Passing Score**: 70% (28/40 questions correct)  
**Duration**: 65 minutes

---

## 📖 Detailed Syllabus

### Block 1 – Sequence Containers and Container Adapters
*Exam items: 4 | Weight: 13.25%*

**Learning Objectives:**
- 1.1 Identify and explain the purpose and characteristics of sequence containers: `std::vector`, `std::deque`, `std::list`
- 1.2 Identify and explain the purpose and characteristics of container adapters: `std::queue`, `std::priority_queue`, `std::stack`
- 1.3 Apply standard methods of vector, deque, list, queue, priority_queue, and stack for common operations (insertion, deletion, access)
- 1.4 Use iterators to traverse and access elements in sequence containers and adapters
- 1.5 Manipulate sequence containers with both simple (built-in) and complex (user-defined) data types
- 1.6 Access and modify container elements using member functions and iterator-based approaches

**Key Topics:** `std::vector`, `std::deque`, `std::list`, `std::queue`, `std::priority_queue`, `std::stack`, container adapters, iterators, element access, insertion and removal methods, use with user-defined types

---

### Block 2 – Associative Containers
*Exam items: 4 | Weight: 13.25%*

**Learning Objectives:**
- 2.1 Identify and explain the characteristics and use cases of associative containers: `std::set`, `std::multiset`, `std::map`, `std::multimap`
- 2.2 Apply standard methods of set, multiset, map, and multimap for insertion, deletion, search, and data retrieval
- 2.3 Use associative containers with both simple (built-in) and complex (user-defined) data types
- 2.4 Traverse associative containers using iterators and access stored data
- 2.5 Perform operations on container elements using container-specific member functions and iterators

**Key Topics:** `std::set`, `std::multiset`, `std::map`, `std::multimap`, insertion, deletion, search, iterators, key-value pairs, use with user-defined types

---

### Block 3 – Algorithms: Non-Modifying Sequence Operations
*Exam items: 4 | Weight: 13.25%*

**Learning Objectives:**
- 3.1 Explain the purpose of non-modifying sequence algorithms and their use cases in iterating over containers
- 3.2 Apply `std::for_each` to iterate over a range of elements and perform an operation on each element
- 3.3 Use searching algorithms: `std::find`, `std::find_if`, `std::find_end`, `std::find_first_of`, `std::adjacent_find`, `std::search`, `std::search_n`
- 3.4 Apply counting algorithms `std::count` and `std::count_if` to count elements based on specified criteria
- 3.5 Use comparison algorithms `std::mismatch` and `std::equal` to compare ranges of elements

**Key Topics:** `std::for_each`, `std::find`, `std::find_if`, `std::find_end`, `std::find_first_of`, `std::adjacent_find`, `std::search`, `std::search_n`, `std::count`, `std::count_if`, `std::mismatch`, `std::equal`, iteration, searching, comparing ranges

---

### Block 4 – Algorithms: Modifying Sequence Operations
*Exam items: 4 | Weight: 13.25%*

**Learning Objectives:**
- 4.1 Apply algorithms for generating and copying data: `std::copy`, `std::copy_backward`, `std::fill`, `std::fill_n`, `std::generate`, `std::generate_n`
- 4.2 Use swapping and transformation algorithms: `std::swap_ranges`, `std::swap`, `std::iter_swap`, `std::transform`
- 4.3 Apply replacement and removal algorithms: `std::replace`, `std::remove`, `std::remove_if`, `std::unique`, `std::unique_copy`
- 4.4 Use sequence-reordering algorithms: `std::reverse`, `std::reverse_copy`, `std::rotate`, `std::partition`, `std::stable_partition`

**Key Topics:** `std::copy`, `std::fill`, `std::generate`, `std::swap`, `std::transform`, `std::replace`, `std::remove`, `std::unique`, `std::reverse`, `std::rotate`, `std::partition`, modifying container elements, removing duplicates, rearranging sequences

---

### Block 5 – Algorithms: Sorting and Binary Search
*Exam items: 5 | Weight: 16.5%*

**Learning Objectives:**
- 5.1 Apply sorting algorithms `std::sort` and `std::stable_sort` to arrange elements in ordered sequences based on default or custom comparison criteria
- 5.2 Use binary search algorithms: `std::lower_bound`, `std::upper_bound`, `std::binary_search` to search for elements in sorted containers efficiently

**Key Topics:** `std::sort`, `std::stable_sort`, `std::lower_bound`, `std::upper_bound`, `std::binary_search`, sorting algorithms, binary search, sorted containers, custom comparison functions

---

### Block 6 – Algorithms: Merge, Heap, Min, Max
*Exam items: 5 | Weight: 16.5%*

**Learning Objectives:**
- 6.1 Apply merging algorithms `std::merge` and `std::inplace_merge` to combine sorted sequences into a single sorted sequence
- 6.2 Use set operations on sorted sequences: `std::includes`, `std::set_union`, `std::set_intersection`, `std::set_difference`, `std::set_symmetric_difference`
- 6.3 Apply algorithms for finding minimum and maximum elements: `std::min_element`, `std::max_element`

**Key Topics:** `std::merge`, `std::inplace_merge`, `std::includes`, `std::set_union`, `std::set_intersection`, `std::set_difference`, `std::set_symmetric_difference`, `std::min_element`, `std::max_element`, merging sorted sequences, set operations, min/max search

---

### Block 7 – STL Functional Objects and Utilities
*Exam items: 2 | Weight: 7%*

**Learning Objectives:**
- 7.1 Apply STL functional objects such as `std::plus`, `std::minus`, and other standard function objects with algorithms like `std::transform`
- 7.2 Use `std::ptr_fun` and other function adapters to bind functions for use with algorithms

**Key Topics:** `std::plus`, `std::minus`, `std::transform`, `std::ptr_fun`, functional objects, function adapters, algorithm utilities

---

### Block 8 – Advanced I/O
*Exam items: 2 | Weight: 7%*

**Learning Objectives:**
- 8.1 Apply advanced input/output operations using stream objects: `std::cout`, `std::cin`, `std::cerr`
- 8.2 Use stream format flags with `setf` and `unsetf` methods to control I/O behavior and appearance
- 8.3 Apply stream manipulators: `boolalpha`, `noshowpoint`, `setprecision`, `fixed`, `setw` to format output

**Key Topics:** `std::cout`, `std::cin`, `setf`, `unsetf`, `boolalpha`, `noshowpoint`, `setprecision`, `fixed`, `setw`, stream manipulators, formatting output

---

### Block 9 – Templates
*Exam items: 2 | Weight: 7%*

**Learning Objectives:**
- 9.1 Define template functions and specialized template functions for generic programming
- 9.2 Define template classes and instantiate them with various data types
- 9.3 Use functions and operator functions from other classes with template classes
- 9.4 Declare and use template classes inside other template classes (nested templates)

**Key Topics:** template functions, function templates, class templates, template
specialization, nested templates, operator overloading with templates

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Storage**: LocalStorage (for exam history)

## 📁 Project Structure

```
cpp-mock-exam/
├── src/
│   ├── components/       # React components
│   │   ├── ExamApp.tsx          # Main app component
│   │   ├── WelcomeScreen.tsx    # Landing page
│   │   ├── ExamScreen.tsx       # Exam interface
│   │   ├── QuestionCard.tsx     # Individual question display
│   │   ├── QuestionNavigator.tsx # Question overview grid
│   │   ├── ResultsScreen.tsx    # Score and review
│   │   └── HistoryScreen.tsx    # Past exam results
│   ├── data/             # Question bank
│   │   └── questionBank.ts
│   ├── hooks/            # Custom React hooks
│   │   └── useExamState.ts
│   ├── services/         # Business logic
│   │   └── storage.service.ts
│   ├── types/            # TypeScript definitions
│   │   └── exam.types.ts
│   ├── utils/            # Helper functions
│   │   └── exam.utils.ts
│   └── main.tsx          # Entry point
├── public/               # Static assets
└── package.json
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Syllabus based on the [C++ Institute's official CPP certification]
  (https://cppinstitute.org/cpp-certified-professional-programmer)
- Built as a study aid for CPP exam preparation

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Good luck with the CPP certification! 🎓**
