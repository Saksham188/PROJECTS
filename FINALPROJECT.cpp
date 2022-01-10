#include <bits/stdc++.h>
#include<ctype.h>
#include<string.h>
#include<windows.h>
#include<conio.h>
#include<stdio.h>
#include<iomanip>
#include<iostream>
#include<dos.h>
#include<fstream>
#include<time.h>
#include<ctype.h>
#include<cstdio>
using namespace std;
COORD coord = {0, 0};
void gotoxy (int x, int y)
{
    coord.X = x;
    coord.Y = y;
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}

class Phone
{
public:
    string Data;
    long long int Mobile;
    Phone *next;
    Phone *prev;

    Phone(string Value, long long int Num)
    {
        Data = Value;
        Mobile = Num;
        next = NULL;
        prev = NULL;
    }
};

void InsertAtHead(Phone *&head, string Value, long long int num)
{
    Phone *n = new Phone(Value, num);
    n->next = head;
    if (head != NULL)
    {
        head->prev = n;
    }

    head = n;
}

bool IsCheck(pair<string, long long int> p1, pair<string, long long int> p2)
{
    if (p1.first > p2.first)
    {
        return false;
    }
    else if (p2.first > p1.first)
    {
        return true;
    }
    else
    {
        if (p1.second > p2.second)
            return false;
        else
            return true;
    }
}
void InsertNumber(Phone *&head, string Value, long long int num)
{

    if (head == NULL)
    {
        InsertAtHead(head, Value, num);
        return;
    }
    Phone *n = new Phone(Value, num);

    Phone *temp = head;
    while (temp->next != NULL)
    {
        temp = temp->next;
    }
    temp->next = n;
    n->prev = temp;
}

Phone *SortList(Phone *&head)
{
    vector<pair<string, long long int>> v;
    Phone *head2 = NULL;

    Phone *temp = head;
    while (temp != NULL)
    {
        v.push_back(pair<string, long long int>(temp->Data, temp->Mobile));
        temp = temp->next;
    }
    sort(v.begin(), v.end(), IsCheck);

    for (auto &it : v)
    {
        InsertNumber(head2, it.first, it.second);
    }
    head = head2;
    return head2;
}

int TotalContacts(Phone *head)
{
    Phone *temp = head;
    int Count = 0;
    while (temp != NULL)
    {
        Count++;
        temp = temp->next;
    }
    return Count;
}

bool Searching(Phone *head, long long int num)
{
    Phone *temp = head;
    int n = int(log10(num) + 1);
    int Count = 0;

    while (temp != NULL)
    {
        long long int val = temp->Mobile;
        long long int num2 = num;
        bool result = true;
        if (num == val)
        {
            result = true;
        }
        else if (num != val and n == 10)
        {
            result = false;
        }
        else
        {
            int Search[10], i = 0;
            while (num2 > 0)
            {
                Search[i] = num2 % 10;
                num2 = num2 / 10;
                i++;
            }
            Search[i] = '\0';

            for (int j = 0; j < i / 2; j++)
            {
                int temp = Search[j];
                Search[j] = Search[i - 1 - j];
                Search[i - 1 - j] = temp;
            }
            int j = 0, ans2[10];
            i = 0;

            while (val > 0)
            {
                ans2[i] = val % 10;
                val = val / 10;
                i++;
            }
            ans2[i] = '\0';

            for (j = 0; j < i / 2; j++)
            {
                int temp = ans2[j];
                ans2[j] = ans2[i - 1 - j];
                ans2[i - 1 - j] = temp;
            }
            i = 0, j = 0;
            result = false;

            while (i < 10 && j < n)
            {

                if (Search[j] == ans2[i])
                {

                    i++;
                    j++;

                    if (j == n)
                    {
                        result = true;
                    }
                }
                else
                {
                    i = i - j + 1;
                    j = 0;
                }
            }
        }
        if (result == true)
        {
            Beep(450,600);
            cout << "\nName: " << temp->Data << " Mobile: " << temp->Mobile;
            Count++;
        }
        temp = temp->next;
    }

    if (Count == 0)
    {
        cout << "\nContact Not Present.";
        Beep(190,300);
    }

}


bool SearchByName(Phone *head, string Name)
{
    Phone *temp = head;
    Phone *temp2 = head;
    int count3 = 0;

    bool Search = false;

    while (temp != NULL)
    {
        if (temp->Data == Name)
        {
            Beep(235, 540);
            cout << "\nName: " << temp->Data << " Mobile: " << temp->Mobile;
            Search = true;
            count3++;
        }

        temp = temp->next;
    }
    if (count3 == 0)
    {
        while (temp2 != NULL)
        {
            if (temp2->Data.find(Name) != string::npos) ///string::npos is an inbuilt function which has value -1.
            {
                Beep(235, 540);

                cout << "\nName: " << temp2->Data << " Mobile: " << temp2->Mobile;
                Search = true;
            }

            temp2 = temp2->next;
        }
    }

    if (Search == false)
    {
        cout << "\nContact Not Present.";
        Beep(350, 500);
    }
    return Search;
}


void UpdateContact(Phone *&head, long long int num)
{
    Phone *temp = head;
    int n = int(log10(num) + 1);
    int Count = 0;

    while (temp != NULL)
    {
        long long int val = temp->Mobile;
        long long int num2 = num;
        bool result = true;
        if (num == val)
        {
            result = true;
        }
        else if (num != val and n == 10)
        {
            result = false;
        }
        else
        {
            int Search[10], i = 0;
            while (num2 > 0)
            {
                Search[i] = num2 % 10;
                num2 = num2 / 10;
                i++;
            }
            Search[i] = '\0';

            for (int j = 0; j < i / 2; j++)
            {
                int temp = Search[j];
                Search[j] = Search[i - 1 - j];
                Search[i - 1 - j] = temp;
            }
            int j = 0, ans2[10];
            i = 0;

            while (val > 0)
            {
                ans2[i] = val % 10;
                val = val / 10;
                i++;
            }
            ans2[i] = '\0';

            for (j = 0; j < i / 2; j++)
            {
                int temp = ans2[j];
                ans2[j] = ans2[i - 1 - j];
                ans2[i - 1 - j] = temp;
            }
            i = 0, j = 0;
            result = false;

            while (i < 10 && j < n)
            {

                if (Search[j] == ans2[i])
                {

                    i++;
                    j++;

                    if (j == n)
                    {
                        result = true;
                    }
                }
                else
                {
                    i = i - j + 1;
                    j = 0;
                }
            }
        }
        if (result == true)
        {
            string Name;
            long long int mob;
            int choice;

            cout << "\nName: " << temp->Data << " Mobile: " << temp->Mobile;

            cout << "\n\nDo you want to update this record: \nPress 0 for No and Press 1 for Yes";
            cout << "\nEnter your choice: ";
            cin >> choice;

            if (choice == 1)
            {
                cout << "\n\nEnter Updated Record: ";
                cout << "\nEnter New Name: ";
                fflush(stdin);
                getline(cin, Name);
                fflush(stdin);

                cout << "Enter new Phone Number: ";
                cin >> mob;
                Beep(200,600);
                temp->Data = Name;
                temp->Mobile = mob;
            }

            Count++;
        }
        temp = temp->next;
    }

    if (Count == 0)
    {
        cout << "\nContact Not Present.";
        Beep(345,710);
    }
}

void UpdateByName(Phone *&head, string Name)
{
    Phone *temp = head;
    bool Search = false;

    while (temp != NULL)
    {
        if (temp->Data == Name)
        {
            Search = true;
            string name;
            long long int mob;
            int choice;

            cout << "\nName: " << temp->Data << " Mobile: " << temp->Mobile;

            cout << "\n\nDo you want to update this record: \nPress 0 for No and Press 1 for Yes";
            cout << "\nEnter your choice: ";
            cin >> choice;
            Beep(234, 550);

            if (choice == 1)
            {
                cout << "\n\nEnter Updated Record: ";
                cout << "\nEnter New Name: ";
                fflush(stdin);
                getline(cin, name);
                fflush(stdin);

                cout << "Enter new Phone Number: ";
                cin >> mob;

                temp->Data = name;
                temp->Mobile = mob;
            }
        }

        temp = temp->next;
    }
    if (Search == false)
    {
        cout << "\nContact Not Present.";
        Beep(350, 500);
    }
}

Phone *deletenode(Phone *head, string s, long long int n)
{
    Phone *curr = head;
    while (curr != NULL and curr->Data != s && curr->Mobile != n)
    {
        curr = curr->next;
    }
    if (curr == head)
    {
        curr->next->prev = NULL;
        head = head->next;
        delete curr;
        return head;
    }
    else
    {
        if (curr->next != NULL || curr->prev != NULL)
        {
            curr->prev->next = curr->next;
            curr->next->prev = curr->prev;
            curr = curr->next;
            delete curr;
            return head;
        }
    }
}

Phone *displaydelete_information(Phone *head, string x)
{
    if (head != NULL)
    {
        Phone *curr = head;

        while (curr != NULL and curr->Data != x)
            curr = curr->next;
        while (curr != NULL and curr->Data == x)
        {
            cout << curr->Data << " " << curr->Mobile << endl;
            curr = curr->next;
        }

        long long int pn;
        string s;
        cout << "enter the phone number and name which you want to delete" << endl;
        cin >> pn;
        fflush(stdin);
        getline(cin, s);
        fflush(stdin);
        head = deletenode(head, s, pn);
    }

    return head;
}


void Display(Phone *head)
{
    head = SortList(head);
    Phone *n = head;
    if (n == NULL)
        cout << "\nNO RECORDS PRESENT.\n";
    else
    {
        cout << "\n*******DISPLAYING DETAILS*******\n";
        while (n != NULL)
        {
            cout << " Name: " << n->Data << " Mobile: " << n->Mobile << "\n";
            n = n->next;
            Beep(245,550);
        }
        cout << "\n********************************\n";
    }
}

void AddNumber(Phone *&head)
{
    string Name;
    long long int num;
    cout << "\nEnter the Name of Person: ";
    fflush(stdin);
    getline(cin, Name);
    fflush(stdin);
    cout << "\nEnter the Mobile Number of Person: ";
    cin >> num;
    InsertNumber(head, Name, num);
}



void start()
{

    int a;
    system("color 57");
    Beep(350,700);
    Beep(200,800);
    Beep(400,250);
    Beep(523,600);
    Beep(540,600);
    for(a=50; a>30; a--)
    {
        gotoxy(25,10);
        cout<<"Welcome to the PHONEBOOK MANAGEMENT SYSTEM";
        Sleep(50);
    }
    for(a=42; a<52; a++)
    {
        gotoxy(27,18);
        cout<<"Please Wait";
        gotoxy(a,18);
        cout<<".";
        Sleep(200);
    }
    system("cls");
    system("color A0");
    for(int j=0; j<10; j++)
    {
        system("cls");
        gotoxy(j,6);
        cout<<"   ����������������������������";
        gotoxy(j,7);
        cout<<"      ������   �    �   ���������";
        gotoxy(j,8);
        cout<<"      �    �   �    �   �       �";
        gotoxy(j,9);
        cout<<"      �    �   �    �   �       �";
        gotoxy(j,10);
        cout<<"      ������   ������   �       �";
        gotoxy(j,11);
        cout<<"      �        �    �   �       �";
        gotoxy(j,12);
        cout<<"      �        �    �   �       �";
        gotoxy(j,13);
        cout<<"      �        �    �   ���������";


        gotoxy(51-j,6);
        cout<<"���������������������    \n\r";
        gotoxy(51-j,7);
        cout<<" �      �   ��������      \n\r";
        gotoxy(51-j,8);
        cout<<" ��     �   �               \n\r";
        gotoxy(51-j,9);
        cout<<" � �    �   �            \n\r";
        gotoxy(51-j,10);
        cout<<" �  �   �   ��������      \n\r";
        gotoxy(51-j,11);
        cout<<" �    � �   �             \n\r\n\n";
        gotoxy(51-j,12);
        cout<<" �     ��   �             \n\r";
        gotoxy(51-j,13);
        cout<<" �      �   ��������       \n\r\n\n\n\n\n\n\n";

        gotoxy(j,16);
        cout<<"                    ���������  ���������";
        gotoxy(j,17);
        cout<<"                    �       �  �       �";
        gotoxy(j,18);
        cout<<"                    �       �  �       �";
        gotoxy(j,19);
        cout<<"                    ���������  �       �";
        gotoxy(j,20);
        cout<<"                    �       �  �       �";
        gotoxy(j,21);
        cout<<"                    �       �  �       �";
        gotoxy(j,22);
        cout<<"                    ���������  ���������";
        gotoxy(j,23);
        cout<<"                    �������������������������";

        gotoxy(58-j,16);
        cout<<" ��������    �   �        \n\r";
        gotoxy(58-j,17);
        cout<<" �      �    �  �          \n\r";
        gotoxy(58-j,18);
        cout<<" �      �    � �           \n\r";
        gotoxy(58-j,19);
        cout<<" �      �    ��             \n\r";
        gotoxy(58-j,20);
        cout<<" �      �    � �            \n\r";
        gotoxy(58-j,21);
        cout<<" �      �    �  �           \n\r\n\n";
        gotoxy(58-j,22);
        cout<<" ��������    �   �          \n\r";
        gotoxy(58-j,23);
        cout<<" ����������������������        \n\r";



        Sleep(80);
    }
    gotoxy(25,25);
    cout<<"press any key to continue...";
    Beep(250,450);
    getch();
    Sleep(50);

}


int main()
{

    Phone *head = NULL;
    int i = 1, choice, choice2;
    string Name;
    long long int num;

    start();

    system("cls");

    while (i)
    {
        system("cls");

        cout << "\n\n**************************************************************************************";
        cout << "\n\t\t\tWELCOME TO PHONEBOOK MANAGEMENT SYSTEM\n";
        cout << "**************************************************************************************\n";
        cout << "\nPress 1 to Insert Number ";
        Beep(350, 700);
        cout << "\nPress 2 to Search Number ";
        Beep(400, 700);
        cout << "\nPress 3 to Update Number ";
        Beep(450, 700);
        cout << "\nPress 4 to Display PhoneBook";
        Beep(250, 700);
        cout << "\nPress 5 to Count Total Records";
        Beep(200, 700);
        cout << "\nPress 6 to Delete Number";
        Beep(200, 700);
        cout << "\nPress 7 to Exit";
        Beep(150, 700);
        cout << "\nEnter your choice: ";
        cin >> choice;
        Beep(234, 550);

        switch (choice)
        {
        case 1:
        {

            AddNumber(head);
            cout << "\nNumber Added Successfully.\n";
            Beep(234, 550);
        }

        break;

        case 2:
        {
            cout << "\n Press 1 to Search by Name ";
            cout << "\n Press 2 to Search by Phone Number ";
            cout << "\nEnter your choice: ";
            SortList(head);
            int Schoice;
            cin >> Schoice;
            Beep(200, 400);

            if (Schoice == 1)
            {
                cout << "Enter the name you want to search: ";
                fflush(stdin);
                getline(cin, Name);
                fflush(stdin);

                SearchByName(head, Name);
            }

            if (Schoice == 2)
            {
                cout << "Enter the Mobile Number you want to search: ";
                cin >> num;

                Searching(head, num);
            }
        }
        break;

        case 3:
        {
            cout << "\n Press 1 to Update by Name ";
            Beep(450, 500);
            Sleep(100);
            cout << "\n Press 2 to Update by Phone Number ";
            Beep(350, 400);
            cout << "\nEnter your choice: ";
            int Uchoice;
            cin >> Uchoice;
            Beep(350, 500);

            SortList(head);

            if (Uchoice == 1)
            {
                cout << "\nEnter the name you want to Update: ";
                fflush(stdin);
                getline(cin, Name);
                fflush(stdin);
                UpdateByName(head, Name);
            }

            if (Uchoice == 2)
            {
                cout << "\nEnter the Mobile Number you want to Update: ";
                cin >> num;
                UpdateContact(head, num);
            }
        }
        break;
        case 4:
        {
            SortList(head);
            Display(head);
            break;
        }
        case 5:
        {
            cout << "\n*********************************************************";
            cout << "\nTotal Contacts in PhoneBook: " << TotalContacts(head);
            cout << "\n*********************************************************\n";
        }
        break;
        case 6:
        {
            cout << "\nEnter the name you want to Delete: ";
            fflush(stdin);
            getline(cin, Name);
            fflush(stdin);
            head = displaydelete_information(head, Name);
            Display(head);
        }
        break;
        case 7:
        {
            exit(0);
        }
        default:
        {
            cout << "\nWrong Choice Entered.Enter Again.\n";
        }
        break;
        }
        cout << "enter any key to go back to menu";
        getch();
        system("cls");
    }
}
