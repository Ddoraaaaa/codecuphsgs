#include <iostream>
#include <vector>
#include <map>
using namespace std;
typedef pair<int, int> office;
const int MAX_N = 3005; 
int dx[] = {1, 0, -1, 0}; 
int dy[] = {0, -1, 0, 1}; 

int N; 

class Table {
    int n, *T; 
public: 
    Table(int _n) : n(_n) { T = new int[(n + 1) * (n + 1)]; }
    int& operator [] (const office &P) const {
        return T[P.first * (n + 1) + P.second]; 
    }
};

office adjacent(office A, int direction) {
    return {A.first + dx[direction], A.second + dy[direction]};
}

vector<pair<int, int> > pairs(int l1, int r1, int l2, int r2) {  
    vector<pair<int, int> > result; 
    result.reserve((r1 - l1 + 1) * (r2 - l2 + 1)); 
    for (int i = l1; i <= r1; i++) {
        for (int j = l2; j <= r2; j++) {
            result.emplace_back(i, j); 
        }
    }
    return result; 
}

signed main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0); 
    cin >> N; 
    Table amount(N);  
    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= N; j++) {
            cin >> amount[{i, j}]; 
        }
        amount[{0, i}] = amount[{i, 0}] = amount[{i, N + 1}] = amount[{N + 1, i}] = INT_MAX / 2; 
    }
    int ans = 0; 
    for (auto middle : pairs(1, N, 1, N)) {
        for (auto [dir_1, dir_2] : pairs(0, 3, 0, 3)) {
            if (dir_1 >= dir_2) continue; 
            ans += (amount[middle] 
                > (int64_t) amount[adjacent(middle, dir_1)] + amount[adjacent(middle, dir_2)]); 
            if (ans == 4) {
                // cout << middle.first << ' ' << middle.second << ' ' << dir_1 << ' ' << dir_2 << '\n'; 
                // return 0; 
            }
        }
    }
    cout << ans; 
}