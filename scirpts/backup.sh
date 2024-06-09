#!/bin/bash

# Define the array of directories to be backed up
DIRECTORIES_TO_BACKUP=(
    "/etc/nginx/conf.d"
    "/usr/share/nginx/luytbq.online"
)

# Define the backup destination directory
BACKUP_DESTINATION="/opt/backup"

# Function to get the current date in yyyyMMddhhmmss format
current_date() {
    date +"%Y%m%d%H%M%S"
}

# Function to convert source path to the desired destination format
convert_path() {
    local source_path="$1"
    echo "$source_path" | sed 's/\//--/g' | sed 's/^--//'
}

# Function to copy a directory to the backup destination with a renamed format
backup_directory() {
    local source_dir="$1"
    local dest_base_dir="$2"
    local date_suffix
    date_suffix=$(current_date)
    
    local converted_path
    converted_path=$(convert_path "$source_dir")
    local dest_dir="$dest_base_dir/${converted_path}_${date_suffix}"
    
    if [[ -d "$source_dir" ]]; then
        echo "Backing up $source_dir to $dest_dir"
        cp -r "$source_dir" "$dest_dir"
    else
        echo "Directory $source_dir does not exist. Skipping."
    fi
}

# Check if any arguments are passed
if [ "$#" -eq 0 ]; then
    # No arguments passed, backup all directories
    for dir in "${DIRECTORIES_TO_BACKUP[@]}"; do
        backup_directory "$dir" "$BACKUP_DESTINATION"
    done
else
    # Backup only the directories passed as arguments
    for dir in "$@"; do
        if [[ " ${DIRECTORIES_TO_BACKUP[@]} " =~ " ${dir} " ]]; then
            backup_directory "$dir" "$BACKUP_DESTINATION"
        else
            echo "Directory $dir is not in the predefined list. Skipping."
        fi
    done
fi