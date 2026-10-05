

## Question 8 🟡 

The goal is to find the **largest digit** in a number.

### Problem

```js
function maxDigit(n) {
    // your code
}

console.log(maxDigit(58329));
```

### Expected Output

```text
9
```

Because:

```text
5, 8, 3, 2, 9
```

and the largest digit is:

```text
9
```

---

# Think Before Coding

This problem is different from counting.

Previously, we returned:

```text
1
```

or:

```text
0
```

based on a condition.

Here, we need to compare **two values**:

```text
current digit
        vs
largest digit returned by recursion
```

For example:

```text
maxDigit(58329)
```

The current digit is:

```text
9
```

The remaining number is:

```text
5832
```

So the problem becomes:

```text
max(9, maxDigit(5832))
```

But we're not using `Math.max()` yet.

We will manually compare the two values.

---

# Questions Before Coding

### 1. Base Case

When:

```text
n === 0
```

there are no more digits to process.

So:

```js
if (n === 0) return 0;
```

Therefore:

```text
Base case = 0
```

---

### 2. Current Digit

The last digit is:

```js
let lastDigit = n % 10;
```

For:

```text
58329
```

we get:

```text
9
```

---

### 3. Smaller Problem

Remove the last digit:

```js
Math.floor(n / 10)
```

For:

```text
58329
```

we get:

```text
5832
```

So:

```js
maxDigit(Math.floor(n / 10))
```

---

### 4. How Do We Combine the Results?

We have:

```text
lastDigit
```

and:

```text
recursiveDigit
```

Compare them:

```text
if lastDigit > recursiveDigit
    return lastDigit
else
    return recursiveDigit
```

---

# Solution

Your solution is correct:

```js
function maxDigit(n) {

    if (n === 0) return 0;

    let lastDigit = Math.floor(n % 10);

    let recursiveDigit = maxDigit(Math.floor(n / 10));

    if (lastDigit > recursiveDigit) {
        return lastDigit;
    } else {
        return recursiveDigit;
    }
}

console.log(maxDigit(58329));
```

### Output

```text
9
```

---

# Small Improvement to Your Code

You wrote:

```js
else {
    return lastDigit = recursiveDigit;
}
```

This works because the assignment expression evaluates to `recursiveDigit`.

But the assignment isn't necessary.

Instead, write:

```js
else {
    return recursiveDigit;
}
```

The purpose of this function is to **return the larger value**, not modify `lastDigit`.

So prefer:

```js
if (lastDigit > recursiveDigit) {
    return lastDigit;
} else {
    return recursiveDigit;
}
```

---

# Complete Dry Run

Let's completely trace:

```js
maxDigit(58329)
```

---

## Step 1

```text
n = 58329
lastDigit = 9
remaining = 5832
```

Call:

```text
maxDigit(5832)
```

We don't know yet whether `9` is the largest because we haven't checked the remaining digits.

So we wait for the recursive result.

---

## Step 2

```text
n = 5832
lastDigit = 2
remaining = 583
```

Call:

```text
maxDigit(583)
```

---

## Step 3

```text
n = 583
lastDigit = 3
remaining = 58
```

Call:

```text
maxDigit(58)
```

---

## Step 4

```text
n = 58
lastDigit = 8
remaining = 5
```

Call:

```text
maxDigit(5)
```

---

## Step 5

```text
n = 5
lastDigit = 5
remaining = 0
```

Call:

```text
maxDigit(0)
```

---

## Step 6 — Base Case

```js
if (n === 0) return 0;
```

Therefore:

```text
maxDigit(0)
→ 0
```

Now recursion starts **unwinding**.

---

# Recursion Unwinding

This is the most important part of this problem.

We start with:

```text
maxDigit(5)
```

We have:

```text
current digit = 5
recursive result = 0
```

Compare:

```text
5 > 0
```

Yes.

Therefore:

```text
maxDigit(5)
→ 5
```

---

## Next

Now we're returning to:

```text
maxDigit(58)
```

Current digit:

```text
8
```

Recursive result:

```text
5
```

Compare:

```text
8 > 5
```

Yes.

Therefore:

```text
maxDigit(58)
→ 8
```

---

## Next

Now:

```text
maxDigit(583)
```

Current digit:

```text
3
```

Recursive result:

```text
8
```

Compare:

```text
3 > 8
```

No.

Therefore:

```text
maxDigit(583)
→ 8
```

---

## Next

Now:

```text
maxDigit(5832)
```

Current digit:

```text
2
```

Recursive result:

```text
8
```

Compare:

```text
2 > 8
```

No.

Therefore:

```text
maxDigit(5832)
→ 8
```

---

## Final

Now:

```text
maxDigit(58329)
```

Current digit:

```text
9
```

Recursive result:

```text
8
```

Compare:

```text
9 > 8
```

Yes.

Therefore:

```text
maxDigit(58329)
→ 9
```

Final answer:

```text
9
```

---

# Visualizing the Recursion

### Going Down

```text
maxDigit(58329)
       ↓
maxDigit(5832)
       ↓
maxDigit(583)
       ↓
maxDigit(58)
       ↓
maxDigit(5)
       ↓
maxDigit(0)
```

### Coming Back Up

```text
0
↑
5
↑
8
↑
8
↑
9
```

The important thing is that the **real comparison happens while recursion is unwinding**.

---

# The Core Pattern

This is a new recursion pattern.

Previously:

```text
current contribution + recursive result
```

For example:

```text
digit + sumDigits(remaining)
```

Now we have:

```text
compare current value with recursive result
```

The general pattern is:

```js
if (baseCase) return baseValue;

let currentValue = ...;

let recursiveResult = recursiveFunction(smallerProblem);

if (currentValue > recursiveResult) {
    return currentValue;
} else {
    return recursiveResult;
}
```

For this problem:

```js
let lastDigit = n % 10;

let recursiveDigit = maxDigit(Math.floor(n / 10));

if (lastDigit > recursiveDigit) {
    return lastDigit;
} else {
    return recursiveDigit;
}
```

---

# Why We Need the Recursive Result First

This line:

```js
let recursiveDigit = maxDigit(Math.floor(n / 10));
```

is extremely important.

We can't decide whether the current digit is the largest until we know the largest digit from the remaining number.

For:

```text
58329
```

we have:

```text
current digit = 9
```

but we need to ask:

```text
What is the largest digit in 5832?
```

That gives:

```text
8
```

Now we can compare:

```text
9 vs 8
```

Therefore:

```text
9
```

---

# No `Math.max()` Yet

The problem specifically asks us to understand the comparison manually.

So this:

```js
return Math.max(lastDigit, recursiveDigit);
```

is intentionally avoided.

First understand:

```js
if (lastDigit > recursiveDigit) {
    return lastDigit;
} else {
    return recursiveDigit;
}
```

Once this logic is clear, `Math.max()` becomes easy.

---

# Cleaner Version

You can simplify the digit extraction because `% 10` already gives the last digit:

```js
function maxDigit(n) {

    if (n === 0) return 0;

    let lastDigit = n % 10;

    let recursiveDigit = maxDigit(Math.floor(n / 10));

    if (lastDigit > recursiveDigit) {
        return lastDigit;
    }

    return recursiveDigit;
}

console.log(maxDigit(58329));
```

Output:

```text
9
```

---

# Complexity

If the number contains `d` digits:

```text
Time:  O(d)
Space: O(d)
```

Every digit is processed once.

The recursive calls create a call stack containing one frame for each digit.

---

# Practice

Try these without using `Math.max()`:

```js
maxDigit(12345)    // 5
maxDigit(9876)     // 9
maxDigit(1111)     // 1
maxDigit(2468)     // 8
maxDigit(70001)    // 7
maxDigit(55555)    // 5
maxDigit(0)        // 0
```



---


Question 8 introduces a new idea:

```text
current value
      vs
recursive result
      ↓
choose the larger one
```

So the important recursion pattern is:

```text
             Number
                ↓
        Extract current digit
                ↓
        Solve smaller problem
                ↓
       Get recursive result
                ↓
       Compare both values
                ↓
        Return the larger one
```

This is a significant step up from simple counting recursion.
