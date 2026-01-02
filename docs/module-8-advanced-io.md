# Module 8: Advanced I/O Operations

## Overview

Welcome to C++ I/O! This module covers one of the most practical aspects of C++: reading and writing data. Whether you're working with files, building strings, or formatting output, you'll use these techniques constantly.

**What you'll learn:**

- How streams work and why they're powerful
- File operations (reading, writing, binary data)
- String streams (building and parsing strings efficiently)
- Stream manipulators (formatting output beautifully)
- Error handling (detecting and recovering from failures)
- Performance optimization (buffering strategies)

### What is Stream-Based I/O?

**The Core Concept:**  
A **stream** is like a pipe where data flows between your program and the outside world. Think of it as a conveyor belt carrying bytes.

```
Your Program  →→→  [Stream Buffer]  →→→  Destination
              data flowing out              (file, screen, string)

Source        →→→  [Stream Buffer]  →→→  Your Program
(file, user,       data flowing in
 string)
```

**Why Streams?**

1. **Universal Interface** - Same code for files, strings, console, network
2. **Type-Safe** - `<<` and `>>` know how to handle different types
3. **Buffered** - Efficient by collecting data before actual I/O
4. **Composable** - Chain operations together naturally

### The Stream Family Tree

Understanding the hierarchy helps you pick the right tool:

```
ios_base (base class)
    ├─ Format state (precision, width, flags)
    └─ Error flags (good, eof, fail, bad)
         ↓
    ios (adds stream buffer)
         ↓
    ┌────┴────┐
    ↓         ↓
istream    ostream
(input)    (output)
  ↓           ↓
  ├─ cin (console input)      ├─ cout (console output)
  ├─ ifstream (file input)    ├─ ofstream (file output)
  └─ istringstream (string)   └─ ostringstream (string)
         ↓
    iostream (both directions)
         ↓
    ├─ fstream (file read+write)
    └─ stringstream (string read+write)
```

**Quick Reference:**

| Need to... | Use | Example |
|------------|-----|---------|
| Read from file | `ifstream` | `ifstream file("data.txt");` |
| Write to file | `ofstream` | `ofstream file("output.txt");` |
| Read & write file | `fstream` | `fstream file("data.txt", ios::in \| ios::out);` |
| Build a string | `ostringstream` | `ostringstream oss; oss << "Value: " << 42;` |
| Parse a string | `istringstream` | `istringstream iss("42"); iss >> value;` |
| Console input | `cin` | `cin >> value;` |
| Console output | `cout` | `cout << value;` |
| Error output | `cerr` (unbuffered) | `cerr << "Error!";` |

### The Power of Uniform Interface

**This is what makes streams beautiful:**

```cpp
// Write to different destinations using SAME CODE
template<typename Stream>
void writeData(Stream& stream, int value) {
    stream << "Value: " << value << '\n';
}

// Works with files
std::ofstream file("output.txt");
writeData(file, 42);

// Works with strings
std::ostringstream str;
writeData(str, 42);

// Works with console
writeData(std::cout, 42);
```

### Key Concepts (We'll Deep-Dive Into Each)

**1. Stream State** - Every stream tracks its health
```cpp
if (file)           // Is stream ready?
if (file.eof())     // Reached end?
if (file.fail())    // Did operation fail?
```

**2. Buffering** - Data accumulates before actual I/O
```cpp
file << "data";     // Goes to buffer
file << std::flush; // NOW writes to disk
```

**3. Manipulators** - Objects that change stream behavior
```cpp
cout << std::hex << 255;        // Prints: ff
cout << std::setw(10) << 42;    // Prints:         42
```

**4. Persistence** - Some settings stick, others don't
```cpp
cout << std::setw(10) << 42;    // Width for THIS item only
cout << std::hex << 255;        // Hex for ALL subsequent items
```

### Why Understanding I/O Matters

**Real-World Applications:**
- 📁 **File Processing** - Config files, logs, data persistence
- 📊 **Data Serialization** - Save/load program state
- 🔤 **String Manipulation** - Build complex strings efficiently
- 📝 **Formatted Output** - Tables, reports, aligned data
- 🐛 **Error Handling** - Detect file not found, parse errors
- ⚡ **Performance** - Buffering strategies for speed

**A Motivating Example:**

```cpp
// Without understanding I/O (clunky, error-prone)
FILE* f = fopen("data.txt", "w");
if (f == NULL) { /* error */ }
fprintf(f, "Value: %d\n", 42);
fclose(f);

// With C++ streams (clean, type-safe)
std::ofstream file("data.txt");
if (!file) { /* error */ }
file << "Value: " << 42 << '\n';
// Automatically closes when file goes out of scope!
```

📖 [cppreference: Input/output library](https://en.cppreference.com/w/cpp/io)

---

## Part 1: Stream Types - Choosing Your Tool

### File Streams - Working with Files

**The Three File Stream Types:**

1. **`ifstream`** - Input File Stream (reading)
2. **`ofstream`** - Output File Stream (writing)
3. **`fstream`** - File Stream (both reading and writing)

**When to Use Which:**

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    // ✅ ifstream - Reading from file
    // Use when: Loading config, reading data, parsing logs
    std::ifstream in("config.txt");
    if (!in) {
        std::cerr << "Failed to open file\n";
        return 1;
    }
    
    std::string line;
    while (std::getline(in, line)) {
        std::cout << "Read: " << line << '\n';
    }
    // No need to close - automatically closed when 'in' goes out of scope
    
    // ✅ ofstream - Writing to file
    // Use when: Saving data, writing logs, generating output
    std::ofstream out("output.txt");
    if (!out) {
        std::cerr << "Failed to create file\n";
        return 1;
    }
    
    out << "Hello, file!" << '\n';
    out << "Value: " << 42 << '\n';
    // Automatically closed and flushed here
    
    // ✅ fstream - Both reading and writing
    // Use when: Need to read AND write, random access, updating files
    std::fstream file("data.txt", std::ios::in | std::ios::out);
    if (!file) {
        std::cerr << "Failed to open file\n";
        return 1;
    }
    
    // Can both read...
    std::string data;
    std::getline(file, data);
    
    // ...and write
    file << "New data\n";
    
    return 0;
}
```

**Text vs Binary Mode:**

```cpp
// TEXT MODE (default) - Human-readable
// ✅ Use for: Config files, logs, CSV, JSON, XML
std::ofstream text("data.txt");
text << 42 << " " << 3.14 << " hello";
// File contains: "42 3.14 hello" (readable in notepad)

// BINARY MODE - Raw bytes
// ✅ Use for: Images, serialized structs, databases, compressed data
std::ofstream binary("data.bin", std::ios::binary);
int value = 42;
binary.write(reinterpret_cast<char*>(&value), sizeof(value));
// File contains: 4 bytes representing integer 42 (not readable as text)

// Why binary mode matters:
// 1. Faster (no formatting/parsing)
// 2. Smaller (raw bytes vs text representation)
// 3. Exact (no precision loss for floats)
// 4. Prevents newline translation on Windows (\n ↔ \r\n)
```

**RAII (Resource Acquisition Is Initialization) - Automatic Cleanup:**

```cpp
{
    std::ofstream file("data.txt");
    file << "Some data";
    // No need to call file.close()!
    // File is automatically closed and flushed when 'file' goes out of scope
}
// File is now safely closed, even if an exception occurred

// Manual close only needed for:
void processFile() {
    std::ofstream file("data.txt");
    file << "data";
    file.close();  // Close NOW to release file handle
    
    // Can continue doing other work...
    someOtherFunction();
}
```

📖 [cppreference: std::fstream](https://en.cppreference.com/w/cpp/io/basic_fstream)

### String Streams - In-Memory I/O

**The Concept:**  
String streams let you use stream operations (`<<` and `>>`) with strings in memory, just like you would with files or console. They're perfect for building formatted strings and parsing text.

**The Three String Stream Types:**

1. **`ostringstream`** - Build strings (like writing to a file, but to memory)
2. **`istringstream`** - Parse strings (like reading from a file, but from memory)
3. **`stringstream`** - Both (read and write)

```cpp
#include <sstream>
#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // ✅ ostringstream - Building formatted strings
    // Use when: Creating complex strings, avoiding string concatenation
    std::ostringstream oss;
    oss << "Value: " << 42 << ", Pi: " << std::fixed << std::setprecision(2) << 3.14159;
    std::string result = oss.str();  // Extract the built string
    std::cout << result << '\n';  // "Value: 42, Pi: 3.14"
    
    // Why better than string concatenation:
    // ❌ Slow: result = "Value: " + std::to_string(42) + ", Pi: " + std::to_string(3.14);
    // ✅ Fast: Uses ostringstream (better buffering, fewer allocations)
    
    // ✅ istringstream - Parsing strings
    // Use when: Splitting strings, parsing user input, reading structured text
    std::istringstream iss("100 200 300");
    int a, b, c;
    iss >> a >> b >> c;  // Extracts three integers
    std::cout << "Sum: " << (a + b + c) << '\n';  // 600
    
    // Real example: Parsing CSV line
    std::string csv_line = "John,25,Engineer";
    std::istringstream csv(csv_line);
    std::string name, job;
    int age;
    
    std::getline(csv, name, ',');    // Read until comma
    csv >> age;                       // Read number
    csv.ignore(1);                    // Skip comma
    std::getline(csv, job);          // Read rest
    
    std::cout << name << " is " << age << " years old, works as " << job << '\n';
    
    // ✅ stringstream - Both reading and writing
    // Use when: Need to both build and parse (less common)
    std::stringstream ss;
    ss << "42";           // Write
    int value;
    ss >> value;          // Read
    std::cout << value * 2 << '\n';  // 84
    
    return 0;
}
```

**Real-World Use Cases:**

**1. Building Complex Strings:**
```cpp
// Building error message with context
std::ostringstream error;
error << "Error at line " << lineNum 
      << ", column " << colNum 
      << ": " << errorMessage;
std::string fullError = error.str();
```

**2. Parsing User Input:**
```cpp
std::string input = "move 10 20";
std::istringstream iss(input);
std::string command;
int x, y;

iss >> command >> x >> y;
if (command == "move") {
    movePlayer(x, y);
}
```

**3. Number-to-String with Formatting:**
```cpp
double price = 19.99;
std::ostringstream oss;
oss << "$" << std::fixed << std::setprecision(2) << price;
std::string priceStr = oss.str();  // "$19.99"
```

**4. String-to-Number Conversion (Safer than atoi):**
```cpp
std::string userInput = "42";
std::istringstream iss(userInput);
int number;

if (iss >> number) {
    std::cout << "Valid number: " << number << '\n';
} else {
    std::cout << "Invalid input!\n";
}
```

**Performance Tip:**

```cpp
// ❌ SLOW - creates many temporary strings
std::string result;
for (int i = 0; i < 1000; ++i) {
    result += std::to_string(i) + " ";  // Many allocations!
}

// ✅ FAST - efficient buffering
std::ostringstream oss;
for (int i = 0; i < 1000; ++i) {
    oss << i << " ";  // Minimal allocations
}
std::string result = oss.str();
```

**Reusing String Streams:**

```cpp
std::ostringstream oss;

// Build first string
oss << "First: " << 42;
std::string first = oss.str();

// Clear for reuse (both content AND state)
oss.str("");        // Clear content
oss.clear();        // Clear error flags

// Build second string
oss << "Second: " << 100;
std::string second = oss.str();
```

📖 [cppreference: std::stringstream](https://en.cppreference.com/w/cpp/io/basic_stringstream)

---

## Part 2: Stream Manipulators - Formatting Output

**What Are Manipulators?**  
Manipulators are special objects you insert into streams to change their behavior. Think of them as "commands" that tell the stream how to format data.

```cpp
std::cout << std::hex << 255;  // Changes number base to hexadecimal
// Output: ff
```

**Critical Concept: Sticky vs. Non-Sticky**

Some manipulators apply to ALL subsequent output (sticky), others only to the NEXT item (non-sticky).

```cpp
// ❌ GOTCHA - setw is NOT sticky
std::cout << std::setw(10) << 42 << 100;
// Output: "        42100"  (only 42 is padded!)

// ✅ STICKY - hex applies to all numbers
std::cout << std::hex << 42 << " " << 100;
// Output: "2a 64"  (both in hexadecimal)
```

### Basic Manipulators (In `<iostream>`)

```cpp
#include <iostream>

int main() {
    // endl - newline + flush (SLOW)
    // Use when: Need immediate output (errors, progress)
    std::cout << "Important!" << std::endl;  // Writes to screen NOW
    
    // '\n' - newline only (FAST)
    // Use when: Normal output (let buffer decide when to flush)
    std::cout << "Line 1" << '\n';
    std::cout << "Line 2" << '\n';
    
    // flush - flush buffer without newline
    std::cout << "Progress: " << percent << "%" << std::flush;
    
    // ends - null terminator (rarely used)
    std::cout << "Text" << std::ends;
    
    // Booleans - ✅ STICKY
    bool flag = true;
    std::cout << std::boolalpha << flag << '\n';     // "true"
    std::cout << flag << '\n';                       // "true" (still sticky!)
    std::cout << std::noboolalpha << flag << '\n';   // "1" (back to numeric)
    
    // Show positive sign - ✅ STICKY
    std::cout << std::showpos << 42 << '\n';         // "+42"
    std::cout << std::noshowpos << 42 << '\n';       // "42"
    
    return 0;
}
```

**When to Use endl vs '\\n':**

```cpp
// ✅ Use endl when:
std::cerr << "Error occurred!" << std::endl;  // Error messages (immediate)
std::cout << "Progress: " << i << std::endl;  // Progress updates (want to see now)

// ✅ Use '\n' when:
for (int i = 0; i < 1000; ++i) {
    file << i << '\n';  // Fast bulk output (buffer handles flushing)
}
```

### Numeric Manipulators (Require `<iomanip>`)

**Floating-Point Formatting:**

```cpp
#include <iostream>
#include <iomanip>

int main() {
    double pi = 3.14159265359;
    double big = 12345.6789;
    
    // setprecision - ✅ STICKY
    // Meaning depends on whether fixed/scientific is set!
    
    // Default: precision = total significant digits
    std::cout << std::setprecision(3) << pi << '\n';     // "3.14" (3 significant digits)
    std::cout << big << '\n';                             // "1.23e+04" (still 3 sig digits)
    
    // fixed - ✅ STICKY - digits after decimal point
    std::cout << std::fixed << std::setprecision(2) << pi << '\n';    // "3.14"
    std::cout << big << '\n';                                          // "12345.68"
    
    // scientific - ✅ STICKY - scientific notation
    std::cout << std::scientific << std::setprecision(4) << pi << '\n';  // "3.1416e+00"
    
    // defaultfloat - reset to default behavior
    std::cout << std::defaultfloat;
    
    // Real use case: Formatting prices
    double price = 19.99;
    std::cout << "$" << std::fixed << std::setprecision(2) << price << '\n';  // "$19.99"
    
    return 0;
}
```

**Integer Base Formatting:**

```cpp
int num = 255;

// dec, hex, oct - ✅ STICKY - apply to all subsequent integers
std::cout << std::dec << num << '\n';  // "255" (decimal)
std::cout << std::hex << num << '\n';  // "ff" (hexadecimal)
std::cout << std::oct << num << '\n';  // "377" (octal)

// Back to decimal for normal output
std::cout << std::dec;

// showbase - ✅ STICKY - show 0x, 0 prefix
std::cout << std::showbase;
std::cout << std::hex << num << '\n';  // "0xff"
std::cout << std::oct << num << '\n';  // "0377"
std::cout << std::dec << num << '\n';  // "255" (no prefix for decimal)
std::cout << std::noshowbase;

// uppercase - ✅ STICKY - uppercase hex digits and 'E' in scientific
std::cout << std::uppercase << std::hex << num << '\n';  // "FF" (not "ff")
std::cout << std::nouppercase;
```

**Practical Example - Hex Dump:**

```cpp
void hexDump(const unsigned char* data, size_t length) {
    std::cout << std::hex << std::uppercase << std::setfill('0');
    
    for (size_t i = 0; i < length; ++i) {
        std::cout << std::setw(2) << static_cast<int>(data[i]) << " ";
        if ((i + 1) % 16 == 0) std::cout << '\n';
    }
    
    std::cout << std::dec << std::nouppercase;  // Reset
}
// Output: "48 65 6C 6C 6F 20 57 6F 72 6C 64"
```

📖 [cppreference: std::setprecision](https://en.cppreference.com/w/cpp/io/manip/setprecision)

### Field Width and Alignment

**setw - The Most Important Non-Sticky Manipulator:**

```cpp
#include <iostream>
#include <iomanip>

int main() {
    // setw - ❌ NON-STICKY - applies to NEXT output only!
    std::cout << std::setw(10) << 42 << '\n';  // "        42"
    std::cout << 123 << '\n';                   // "123" (no padding!)
    
    // Must apply to each item
    std::cout << std::setw(10) << 42 
              << std::setw(10) << 100 
              << std::setw(10) << 200 << '\n';
    // Output: "        42       100       200"
    
    return 0;
}
```

**Alignment Options:**

```cpp
// left - ✅ STICKY - left-align within field
std::cout << std::left << std::setw(10) << 42 << "|\n";
// Output: "42        |"

// right - ✅ STICKY - right-align (default)
std::cout << std::right << std::setw(10) << 42 << "|\n";
// Output: "        42|"

// internal - ✅ STICKY - sign/0x on left, number on right
std::cout << std::internal << std::setw(10) << -42 << "|\n";
// Output: "-       42|"

std::cout << std::internal << std::showbase << std::hex 
          << std::setw(10) << 255 << "|\n";
// Output: "0x      ff|"
```

**Fill Character:**

```cpp
// setfill - ✅ STICKY - character used for padding
std::cout << std::setfill('*') << std::setw(10) << 42 << '\n';
// Output: "********42"

std::cout << std::setfill('0') << std::setw(6) << 42 << '\n';
// Output: "000042" (useful for IDs, timestamps)

// Reset to space
std::cout << std::setfill(' ');
```

**Practical Example - Formatted Table:**

```cpp
#include <iostream>
#include <iomanip>
#include <string>
#include <vector>

struct Product {
    std::string name;
    double price;
    int quantity;
};

void printTable(const std::vector<Product>& products) {
    // Set up formatting
    std::cout << std::fixed << std::setprecision(2) << std::left;
    
    // Print header
    std::cout << std::setw(20) << "Product" 
              << std::setw(10) << "Price" 
              << std::setw(10) << "Qty" << '\n';
    std::cout << std::string(40, '-') << '\n';
    
    // Print rows
    for (const auto& p : products) {
        std::cout << std::setw(20) << p.name
                  << std::setw(10) << p.price
                  << std::setw(10) << p.quantity << '\n';
    }
}

// Output:
// Product             Price     Qty       
// ----------------------------------------
// Widget              10.50     100       
// Gadget              25.99     50        
// Thingamajig         99.99     10        
```

**Common Patterns:**

```cpp
// Pattern 1: Fixed-width columns
std::cout << std::setw(10) << "Name" 
          << std::setw(10) << "Value" << '\n';

// Pattern 2: Zero-padded numbers (IDs, dates)
std::cout << std::setfill('0') << std::setw(4) << id << '\n';  // "0042"

// Pattern 3: Right-aligned numbers in table
std::cout << std::right << std::setw(10) << amount << '\n';

// Pattern 4: Currency with alignment
std::cout << "$" << std::fixed << std::setprecision(2) 
          << std::setw(8) << price << '\n';
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

