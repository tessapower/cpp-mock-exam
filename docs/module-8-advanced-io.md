# Module 8: Advanced I/O

## Overview

**What is Stream-Based I/O?**

C++ uses streams as a universal interface for input/output. A stream is a sequence of bytes flowing between your program and an external source/destination (file, string, console, network, etc.).

**The Stream Hierarchy:**

```
ios_base (base class - format state, error flags)
    ↓
ios (adds basic_streambuf)
    ↓
    ├─→ istream (input: >>, get, getline)
    ├─→ ostream (output: <<, put, write)
    └─→ iostream (both input and output)
         ↓
         ├─→ ifstream (file input)
         ├─→ ofstream (file output)
         ├─→ fstream (file both)
         ├─→ istringstream (string input)
         ├─→ ostringstream (string output)
         └─→ stringstream (string both)
```

**Key Concepts:**

1. **Stream State**: Every stream has error flags (good, eof, fail, bad)
2. **Buffering**: Data is buffered for efficiency, flushed periodically
3. **Manipulators**: Special objects that change stream behavior
4. **Persistence**: Some manipulators persist ("sticky"), others are one-shot

**The Big Picture:**

```cpp
// All streams use same interface
std::cout << "Hello";        // Console output
std::ofstream("file.txt") << "Hello";  // File output
std::ostringstream() << "Hello";       // String output

// Same interface for input
std::cin >> value;           // Console input
std::ifstream("file.txt") >> value;    // File input
std::istringstream("42") >> value;     // String input
```

**Why Understanding I/O Matters:**

- **File operations**: Reading/writing data
- **Data serialization**: Converting objects to/from text
- **String manipulation**: Building and parsing strings
- **Error handling**: Detecting and recovering from I/O errors
- **Performance**: Buffering and flushing strategies

📖 [cppreference: Input/output library](https://en.cppreference.com/w/cpp/io)

---

## Stream Types

### File Streams

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    // Output file stream
    std::ofstream out("output.txt");
    out << "Hello, file!" << '\n';
    out.close();
    
    // Input file stream
    std::ifstream in("output.txt");
    std::string line;
    std::getline(in, line);
    std::cout << line << '\n';
    in.close();
    
    // Bidirectional file stream
    std::fstream file("data.txt", std::ios::in | std::ios::out);
    
    // Binary mode
    std::ofstream binary("data.bin", std::ios::binary);
    int value = 42;
    binary.write(reinterpret_cast<char*>(&value), sizeof(value));
    
    return 0;
}
```

📖 [cppreference: std::fstream](https://en.cppreference.com/w/cpp/io/basic_fstream)

### String Streams

```cpp
#include <sstream>
#include <iostream>
#include <string>

int main() {
    // Output string stream (build strings)
    std::ostringstream oss;
    oss << "Value: " << 42 << ", Pi: " << 3.14;
    std::string result = oss.str();
    std::cout << result << '\n';  // "Value: 42, Pi: 3.14"
    
    // Input string stream (parse strings)
    std::istringstream iss("100 200 300");
    int a, b, c;
    iss >> a >> b >> c;
    std::cout << a + b + c << '\n';  // 600
    
    // Bidirectional
    std::stringstream ss;
    ss << "42";
    int value;
    ss >> value;
    std::cout << value * 2 << '\n';  // 84
    
    return 0;
}
```

📖 [cppreference: std::stringstream](https://en.cppreference.com/w/cpp/io/basic_stringstream)

---

## Stream Manipulators

### Basic Manipulators

```cpp
#include <iostream>
#include <iomanip>

int main() {
    // std::endl - newline + flush
    std::cout << "Line 1" << std::endl;
    std::cout << "Line 2" << '\n';  // Faster (no flush)
    
    // std::ends - null terminator
    // std::flush - flush buffer
    std::cout << "Buffered" << std::flush;
    
    // Booleans
    bool flag = true;
    std::cout << std::boolalpha << flag << '\n';  // "true"
    std::cout << std::noboolalpha << flag << '\n';  // "1"
    
    return 0;
}
```

### Numeric Manipulators (require `<iomanip>`)

```cpp
#include <iostream>
#include <iomanip>

int main() {
    double pi = 3.14159265359;
    
    // Precision (number of digits)
    std::cout << std::setprecision(3) << pi << '\n';  // 3.14
    std::cout << std::setprecision(6) << pi << '\n';  // 3.14159
    
    // Fixed notation
    std::cout << std::fixed << std::setprecision(2) << pi << '\n';  // 3.14
    
    // Scientific notation
    std::cout << std::scientific << pi << '\n';  // 3.141593e+00
    
    // Reset to default
    std::cout << std::defaultfloat;
    
    // Hexadecimal/Octal/Decimal
    int num = 255;
    std::cout << std::hex << num << '\n';  // ff
    std::cout << std::oct << num << '\n';  // 377
    std::cout << std::dec << num << '\n';  // 255
    
    // Show base
    std::cout << std::showbase << std::hex << num << '\n';  // 0xff
    
    return 0;
}
```

📖 [cppreference: std::setprecision](https://en.cppreference.com/w/cpp/io/manip/setprecision)

### Field Width and Alignment

```cpp
#include <iostream>
#include <iomanip>

int main() {
    // setw - field width (applies to NEXT output only!)
    std::cout << std::setw(10) << 42 << '\n';  // "        42"
    std::cout << 123 << '\n';  // "123" (no padding)
    
    // Alignment
    std::cout << std::left << std::setw(10) << 42 << "|\n";  // "42        |"
    std::cout << std::right << std::setw(10) << 42 << "|\n";  // "        42|"
    
    // Fill character
    std::cout << std::setfill('*') << std::setw(10) << 42 << '\n';  // "********42"
    
    // Internal (sign on left, number on right)
    std::cout << std::internal << std::setw(10) << -42 << '\n';  // "-*******42"
    
    return 0;
}
```

📖 [cppreference: std::setw](https://en.cppreference.com/w/cpp/io/manip/setw)

---

## Stream State

### State Flags

```cpp
#include <iostream>
#include <fstream>

int main() {
    std::ifstream file("nonexistent.txt");
    
    // Check states
    if (file.good())   std::cout << "Stream is good\n";
    if (file.eof())    std::cout << "End of file\n";
    if (file.fail())   std::cout << "Operation failed\n";
    if (file.bad())    std::cout << "Stream corrupted\n";
    
    // Operator bool
    if (file) std::cout << "Stream OK\n";
    if (!file) std::cout << "Stream has error\n";
    
    // Clear error state
    file.clear();
    
    // Check specific bits
    if (file.rdstate() & std::ios::failbit) {
        std::cout << "Fail bit set\n";
    }
    
    return 0;
}
```

📖 [cppreference: std::ios_base::iostate](https://en.cppreference.com/w/cpp/io/ios_base/iostate)

---

## Format Flags

### Using setf/unsetf

```cpp
#include <iostream>

int main() {
    double num = 3.14159;
    
    // Set flags
    std::cout.setf(std::ios::fixed);
    std::cout.setf(std::ios::showpoint);
    std::cout.precision(2);
    std::cout << num << '\n';  // 3.14
    
    // Unset flags
    std::cout.unsetf(std::ios::fixed);
    std::cout << num << '\n';  // 3.1
    
    // Set with mask (for mutually exclusive flags)
    std::cout.setf(std::ios::left, std::ios::adjustfield);
    std::cout.width(10);
    std::cout << 42 << "|\n";  // "42        |"
    
    return 0;
}
```

📖 [cppreference: std::ios_base::setf](https://en.cppreference.com/w/cpp/io/ios_base/setf)

---

## File Operations

### Opening Modes

```cpp
#include <fstream>
#include <iostream>

int main() {
    // Open modes
    std::ofstream file;
    
    file.open("file.txt", std::ios::out);     // Write (default for ofstream)
    file.open("file.txt", std::ios::app);     // Append
    file.open("file.txt", std::ios::trunc);   // Truncate
    file.open("file.txt", std::ios::ate);     // At end
    file.open("file.txt", std::ios::binary);  // Binary mode
    
    // Combine flags
    file.open("file.txt", std::ios::out | std::ios::app | std::ios::binary);
    
    // Check if opened
    if (file.is_open()) {
        std::cout << "File opened successfully\n";
    }
    
    return 0;
}
```

### Reading Entire File

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream file("data.txt");
    
    // Read line by line
    std::string line;
    while (std::getline(file, line)) {
        std::cout << line << '\n';
    }
    
    // Read entire file at once
    std::ifstream file2("data.txt");
    std::string content((std::istreambuf_iterator<char>(file2)),
                        std::istreambuf_iterator<char>());
    
    // Read with custom delimiter
    std::getline(file, line, ',');  // Read until comma
    
    return 0;
}
```

---

## Seek and Tell

### Stream Positioning

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::fstream file("data.txt", std::ios::in | std::ios::out);
    
    // Tell position
    auto pos = file.tellg();  // Get position for input
    std::cout << "Current position: " << pos << '\n';
    
    // Seek absolute
    file.seekg(0, std::ios::beg);    // Beginning
    file.seekg(0, std::ios::end);    // End
    file.seekg(10, std::ios::beg);   // 10 bytes from start
    
    // Seek relative
    file.seekg(5, std::ios::cur);    // 5 bytes forward
    file.seekg(-3, std::ios::cur);   // 3 bytes backward
    
    // For output streams
    file.tellp();  // Get write position
    file.seekp(0, std::ios::beg);  // Seek write position
    
    return 0;
}
```

📖 [cppreference: std::basic_istream::seekg](https://en.cppreference.com/w/cpp/io/basic_istream/seekg)

---

## Binary I/O

```cpp
#include <fstream>
#include <vector>
#include <iostream>

struct Data {
    int id;
    double value;
};

int main() {
    // Write binary
    std::ofstream out("data.bin", std::ios::binary);
    Data d{42, 3.14};
    out.write(reinterpret_cast<char*>(&d), sizeof(Data));
    out.close();
    
    // Read binary
    std::ifstream in("data.bin", std::ios::binary);
    Data d2;
    in.read(reinterpret_cast<char*>(&d2), sizeof(Data));
    std::cout << "ID: " << d2.id << ", Value: " << d2.value << '\n';
    
    // Write array
    std::vector<int> vec = {1, 2, 3, 4, 5};
    out.open("array.bin", std::ios::binary);
    out.write(reinterpret_cast<char*>(vec.data()), vec.size() * sizeof(int));
    
    return 0;
}
```

---

---

## Understanding Stream State Machine

**The Four State Flags:**

Every stream maintains internal state through flags:

```cpp
std::ifstream file("data.txt");

// good() - No errors, ready for I/O
if (file.good()) { /* All OK, can read/write */ }

// eof() - End of file reached
if (file.eof()) { /* No more data to read */ }

// fail() - Logical error (bad input, conversion failed, file not found)
if (file.fail()) { /* Something went wrong */ }

// bad() - Fatal error (hardware failure, severe stream corruption)
if (file.bad()) { /* Serious problem, stream likely unusable */ }

// Common pattern: check in boolean context
if (file) { /* Same as file.good() */ }
if (!file) { /* Same as file.fail() || file.bad() */ }
```

**State Transitions:**

```cpp
std::istringstream iss("42 abc");
int x, y;

iss >> x;    // SUCCESS: x = 42, state = good
iss >> y;    // FAIL: y unchanged, state = fail (can't convert "abc" to int)

// Check state
if (iss.fail()) {
    std::cout << "Conversion failed!\n";
    
    // Reset state to continue
    iss.clear();  // Clears fail bit
    
    // Skip bad input
    iss.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    
    // Now can continue reading
}
```

**Visual State Machine:**

```
[good] ──┐
         │ successful I/O
         ↓
      [good]
         │ EOF reached
         ↓
       [eof]
         │ logical error (bad input)
         ↓
      [fail]
         │ fatal error
         ↓
       [bad] (usually unrecoverable)
```

## Manipulator Persistence: The Gotcha

**Sticky vs. Non-Sticky:**

```cpp
std::cout << std::setw(10) << 42;     // ❌ NON-STICKY - only affects next item
std::cout << 100;                     // Not padded!

std::cout << std::setprecision(2);    // ✅ STICKY - affects all subsequent items
std::cout << 3.14159 << " " << 2.71828;  // Both use precision 2

// Must explicitly reset sticky manipulators
std::cout << std::defaultfloat;       // Reset to default
```

**Complete Manipulator Reference:**

| Manipulator | Sticky? | Purpose |
|-------------|---------|---------|
| `setw(n)` | ❌ No | Width (one item only) |
| `setfill(c)` | ✅ Yes | Fill character |
| `setprecision(n)` | ✅ Yes | Floating point precision |
| `fixed` / `scientific` | ✅ Yes | Float notation |
| `boolalpha` / `noboolalpha` | ✅ Yes | Bool as text/number |
| `showpos` / `noshowpos` | ✅ Yes | Show + for positive |
| `hex` / `dec` / `oct` | ✅ Yes | Number base |
| `uppercase` / `nouppercase` | ✅ Yes | Hex A-F case |
| `left` / `right` / `internal` | ✅ Yes | Alignment |
| `endl` | ❌ No | Newline + flush |
| `flush` | ❌ No | Flush buffer |

## Decision Guide: Choosing the Right Stream

### Decision Tree

```
What are you doing?

READING/WRITING FILES
├─ Reading only? → std::ifstream
├─ Writing only? → std::ofstream
├─ Both? → std::fstream
└─ Binary data? → Add std::ios::binary flag

BUILDING/PARSING STRINGS
├─ Building string? → std::ostringstream
├─ Parsing string? → std::istringstream
└─ Both? → std::stringstream

CONSOLE I/O
├─ Input from user? → std::cin
├─ Output to console? → std::cout
└─ Error messages? → std::cerr (unbuffered) or std::clog (buffered)

PERFORMANCE CRITICAL
├─ Frequent small writes? → Buffer yourself, flush once
├─ Large binary data? → Use binary mode + write()
└─ Building big string? → ostringstream > repeated +=
```

### Real-World Scenarios

#### Scenario 1: Configuration File Reader

```cpp
#include <fstream>
#include <sstream>
#include <map>
#include <string>

std::map<std::string, std::string> readConfig(const std::string& filename) {
    std::map<std::string, std::string> config;
    std::ifstream file(filename);
    
    if (!file) {
        std::cerr << "Failed to open " << filename << '\n';
        return config;
    }
    
    std::string line;
    while (std::getline(file, line)) {
        // Skip comments and empty lines
        if (line.empty() || line[0] == '#') continue;
        
        // Parse "key=value"
        std::istringstream iss(line);
        std::string key, value;
        
        if (std::getline(iss, key, '=') && std::getline(iss, value)) {
            config[key] = value;
        }
    }
    
    return config;
}
```

#### Scenario 2: CSV File Writer

```cpp
#include <fstream>
#include <vector>
#include <string>

struct Person {
    std::string name;
    int age;
    std::string city;
};

void writeCSV(const std::string& filename, const std::vector<Person>& people) {
    std::ofstream file(filename);
    
    if (!file) {
        std::cerr << "Failed to create file\n";
        return;
    }
    
    // Write header
    file << "Name,Age,City\n";
    
    // Write data
    for (const auto& p : people) {
        file << p.name << ',' << p.age << ',' << p.city << '\n';
    }
    
    // File automatically closes when file goes out of scope
}
```

#### Scenario 3: Binary Data Serialization

```cpp
#include <fstream>
#include <vector>
#include <cstring>

struct Record {
    char name[50];
    int id;
    double salary;
};

void saveBinary(const std::string& filename, const std::vector<Record>& records) {
    std::ofstream file(filename, std::ios::binary);
    
    if (!file) {
        std::cerr << "Failed to create file\n";
        return;
    }
    
    // Write count
    size_t count = records.size();
    file.write(reinterpret_cast<const char*>(&count), sizeof(count));
    
    // Write records
    for (const auto& r : records) {
        file.write(reinterpret_cast<const char*>(&r), sizeof(r));
    }
}

std::vector<Record> loadBinary(const std::string& filename) {
    std::vector<Record> records;
    std::ifstream file(filename, std::ios::binary);
    
    if (!file) {
        std::cerr << "Failed to open file\n";
        return records;
    }
    
    // Read count
    size_t count;
    file.read(reinterpret_cast<char*>(&count), sizeof(count));
    
    // Read records
    records.resize(count);
    for (auto& r : records) {
        file.read(reinterpret_cast<char*>(&r), sizeof(r));
    }
    
    return records;
}
```

#### Scenario 4: Formatted Table Output

```cpp
#include <iostream>
#include <iomanip>
#include <vector>
#include <string>

struct Product {
    std::string name;
    double price;
    int quantity;
};

void printTable(const std::vector<Product>& products) {
    // Set up formatting (sticky!)
    std::cout << std::fixed << std::setprecision(2);
    std::cout << std::left;  // Left align text
    
    // Print header
    std::cout << std::setw(20) << "Product" 
              << std::setw(10) << "Price" 
              << std::setw(10) << "Quantity" << '\n';
    std::cout << std::string(40, '-') << '\n';
    
    // Print rows
    for (const auto& p : products) {
        std::cout << std::setw(20) << p.name
                  << std::setw(10) << p.price
                  << std::setw(10) << p.quantity << '\n';
    }
    
    // Reset to defaults
    std::cout << std::defaultfloat << std::right;
}

// Output:
// Product             Price     Quantity  
// ----------------------------------------
// Widget              10.50     100       
// Gadget              25.99     50        
```

### Common Mistakes and Solutions

#### Mistake 1: Forgetting to Check Stream State

```cpp
// ❌ WRONG - doesn't check if file opened
std::ifstream file("config.txt");
std::string line;
std::getline(file, line);  // Undefined behavior if file doesn't exist!

// ✅ CORRECT - always check
std::ifstream file("config.txt");
if (!file) {
    std::cerr << "Failed to open file\n";
    return;
}
std::string line;
std::getline(file, line);  // Safe
```

#### Mistake 2: Using std::endl Everywhere

```cpp
// ❌ SLOW - flushes buffer every line
for (int i = 0; i < 1000000; ++i) {
    file << i << std::endl;  // Flush 1 million times!
}

// ✅ FAST - only flush when needed
for (int i = 0; i < 1000000; ++i) {
    file << i << '\n';  // Buffer accumulates
}
file << std::flush;  // Flush once at end
```

#### Mistake 3: Thinking setw is Sticky

```cpp
// ❌ WRONG - setw only affects next item
std::cout << std::setw(10) << 42 << 100 << 200;
// Output: "        42100200" (only 42 is padded)

// ✅ CORRECT - apply to each item
std::cout << std::setw(10) << 42 
          << std::setw(10) << 100 
          << std::setw(10) << 200;
// Output: "        42       100       200"
```

#### Mistake 4: Not Clearing Stream State After Failure

```cpp
std::istringstream iss("42 abc 100");
int a, b, c;

iss >> a;  // OK: a = 42
iss >> b;  // FAIL: can't convert "abc"
iss >> c;  // ❌ Still in fail state, c unchanged!

// ✅ CORRECT - clear and skip bad input
iss >> a;
if (!(iss >> b)) {
    iss.clear();  // Reset fail state
    std::string dummy;
    iss >> dummy;  // Skip "abc"
}
iss >> c;  // Now works: c = 100
```

#### Mistake 5: Binary I/O Without binary Flag

```cpp
struct Data {
    int value;
    char data[100];
};

// ❌ WRONG - text mode can corrupt binary data (newline translation on Windows)
std::ofstream file("data.dat");
Data d{42, "test"};
file.write(reinterpret_cast<const char*>(&d), sizeof(d));

// ✅ CORRECT - use binary mode
std::ofstream file("data.dat", std::ios::binary);
Data d{42, "test"};
file.write(reinterpret_cast<const char*>(&d), sizeof(d));
```

### Performance Tips

**Buffering Strategies:**

```cpp
// Slow: Many small writes with endl
for (int i = 0; i < 10000; ++i) {
    file << i << std::endl;  // Flushes each time
}

// Fast: Buffer with '\n', flush once
for (int i = 0; i < 10000; ++i) {
    file << i << '\n';
}
file << std::flush;  // One flush

// Faster: Build string, write once
std::ostringstream oss;
for (int i = 0; i < 10000; ++i) {
    oss << i << '\n';
}
file << oss.str();
```

**String Building:**

```cpp
// Slow: Repeated string concatenation
std::string result;
for (int i = 0; i < 10000; ++i) {
    result += std::to_string(i) + " ";  // Many allocations
}

// Fast: Use ostringstream
std::ostringstream oss;
for (int i = 0; i < 10000; ++i) {
    oss << i << " ";  // Efficient buffering
}
std::string result = oss.str();
```

### Binary vs Text Mode

**When to Use Each:**

| Aspect | Text Mode | Binary Mode |
|--------|-----------|-------------|
| Data Type | Human-readable text | Raw bytes |
| Portability | Cross-platform text | Platform-specific |
| Size | Larger (text encoding) | Smaller (raw data) |
| Newlines | Converted (\n ↔ \r\n) | Raw bytes unchanged |
| Use For | Config files, logs, CSV | Images, structs, serialization |

```cpp
// Text mode: Human-readable
std::ofstream text("data.txt");
text << 42 << " " << 3.14 << " " << true;
// File contains: "42 3.14 1"

// Binary mode: Raw bytes
std::ofstream binary("data.bin", std::ios::binary);
int i = 42;
double d = 3.14;
bool b = true;
binary.write(reinterpret_cast<const char*>(&i), sizeof(i));
binary.write(reinterpret_cast<const char*>(&d), sizeof(d));
binary.write(reinterpret_cast<const char*>(&b), sizeof(b));
// File contains: raw bytes (13 bytes total)
```

## Key Takeaways

✅ **endl** flushes, **'\\n'** doesn't (prefer '\\n' for performance)  
✅ **setw** applies to **next output only**, others persist  
✅ **Manipulators** requiring `<iomanip>`: setw, setprecision, setfill  
✅ **Binary mode** prevents newline translation  
✅ **getline** discards delimiter, doesn't include it in result  
✅ **State flags**: goodbit, eofbit, failbit, badbit

---

[← Previous: Module 7](./module-7-functional-utilities.md) | [Back to Index](./README.md) | [Next: Module 9 →](./module-9-templates.md)

