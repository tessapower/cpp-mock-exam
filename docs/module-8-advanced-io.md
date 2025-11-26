# Module 8: Advanced I/O

## Overview

Advanced input/output operations using streams, manipulators, and formatting.

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

## Key Takeaways

✅ **endl** flushes, **'\\n'** doesn't (prefer '\\n' for performance)  
✅ **setw** applies to **next output only**, others persist  
✅ **Manipulators** requiring `<iomanip>`: setw, setprecision, setfill  
✅ **Binary mode** prevents newline translation  
✅ **getline** discards delimiter, doesn't include it in result  
✅ **State flags**: goodbit, eofbit, failbit, badbit

---

[← Previous: Module 7](./module-7-functional-utilities.md) | [Back to Index](./README.md) | [Next: Module 9 →](./module-9-templates.md)

